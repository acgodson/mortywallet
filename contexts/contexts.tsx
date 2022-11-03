import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import cookies from "js-cookie";
import {
  initFirebase,
  CRYPTO_COMPARE_API_KEY,
  WEB3AUTH_CLIENT_ID,
} from "../config";
import { getAuth, UserCredential, TwitterAuthProvider } from "firebase/auth";
import getSymbolFromCurrency from "currency-symbol-map";
import { Web3AuthCore } from "@web3auth/core";
import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "../utils/algorandRPC";

export interface AuthContext {
  values: {};
}

export const GlobalContext = createContext<AuthContext["values"] | null>(null);

initFirebase();
const GlobalProvider = ({ children }) => {
  const auth = getAuth();
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [userObject, setUserObject] = useState({
    country: "",
    email: "",
    imgUrl: "",
    name: "",
    phone: "",
    uid: "",
  });
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [defaultRate, setDefaultRate] = useState<any | null>(null);
  const [historyPrices, setHistoryPrices] = useState<any | null>(null);
  const [defaultSymbol, setDefaultSymbol] = useState<string | null>(null);
  const [web3Profile, setWeb3Profile] = useState<any | null>(null);
  const [account, setAccount] = useState<any | null>(null);
  const [keyPairs, setKeyPairs] = useState<any | null>(null);
  const [balance, setBalance] = useState<any | null>(null);
  const [inTransactions, setInTransactions] = useState<any | null>(null);
  const [outTransactions, setOutTransactions] = useState<any | null>(null);
  const [twitterAuthCredential, setTwitterAuthCredential] = useState<
    any | null
  >(null);
  const [facebookAccessToken, setFacebookAccessToken] = useState<any | null>(
    null
  );

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  async function priceFetcher() {
    try {
      // http://cors-anywhere.herokuapp.com/
      let request = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=ALGO&tsyms=${defaultCurrency}`,
        {
          headers: {
            Accept: "application/json",
            authorization: CRYPTO_COMPARE_API_KEY,
          },
        }
      );

      if (request) {
        const data = await request.text();
        if (data) {
          const currencyOBj = JSON.parse(data);
          const xyz: any = Object.values(currencyOBj);
          setDefaultRate(xyz);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function historyFetcher() {
    try {
      // http://cors-anywhere.herokuapp.com/
      let request = await fetch(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=ALGO&tsym=${defaultCurrency}&limit=5`,
        {
          headers: {
            Accept: "application/json",
            authorization: CRYPTO_COMPARE_API_KEY,
          },
        }
      );

      if (request) {
        const data = await request.text();
        if (data) {
          const historyOBj = JSON.parse(data);
          const { Data } = historyOBj.Data;
          const prices = Data.map((e: { close: any }) => e.close);
          const list = [];
          prices.forEach((e: number) => {
            const p = e.toString();
            list.push(p);
          });

          console.log(list);
          setHistoryPrices(list);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getUserFromCookie = () => {
    const cookie = cookies.get("auth");
    if (!cookie) {
      return;
    }
    return cookie;
  };

  const setUserCookie = (user: { id: any; email: any; token: any }) => {
    cookies.set("auth", user, {
      expires: 1 / 24,
    });
  };
  1;

  const removeUserCookie = () => cookies.remove("auth");

  const mapUserData = async (user: {
    getIdToken?: any;
    uid?: any;
    email?: any;
  }) => {
    const { uid, email } = user;
    const token = await user.getIdToken(true);
    return {
      id: uid,
      email,
      token,
    };
  };

  const loginWeb3 = async (credential: UserCredential) => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await credential.user.getIdToken(true);
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: idToken,
          verifierIdField: "sub",
          domain: "http://localhost:3000",
        },
      }
    );
    setProvider(web3authProvider);
  };

  const getWeb3Profile = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    if (user) {
      setWeb3Profile(user);
    }
  };

  const web3Logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const logout = async () => {
    web3Logout();
    return auth
      .signOut()
      .then(() => {
        router.push("/login");
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const onGetAlgorandKeypair = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as SafeEventEmitterProvider);
    const algorandKeypair = await rpc.getAlgorandKeyPair();
    uiConsole("Keypair", algorandKeypair);
    if (algorandKeypair) {
      setKeyPairs(algorandKeypair);
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const userAccount = await rpc.getAccounts();
    if (userAccount) {
      setAccount(userAccount);
    }
  };

  const fetchBalance = async () => {
    try {
      const rpc = new RPC(provider);
      const aClient = await rpc.makeClient();
      if (aClient) {
        console.log("Algo client successfully connected");
        const values = await aClient.accountInformation(keyPairs.addr).do();
        if (values) {
          const { amount } = values;
          const formattedAmount = Math.floor(amount / 1e6);
          setBalance(formattedAmount);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signMessage();
    uiConsole("Hash", result);
  };

  const fetchTransactionHistory = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    if (!account) {
      console.log("user not signed in");
      return;
    }

    const allTime = "2020-06-03T10:00:00-05:00";

    const rpc = new RPC(provider);
    const result = await rpc.fetchTransactions(account, allTime);

    if (result) {
      const { transactions }: any = result;

      const xx = [];
      const yy = [];

      const debits = transactions.filter(
        (x: any) => x["payment-transaction"].receiver !== account
      );

      const credits = transactions.filter((x: any) => x.sender !== account);

      credits.forEach((e: any) => {
        const obj = {
          id: e.id,
          sender: e.sender,
          amount: e["payment-transaction"].amount,
          fee: e.fee,
        };
        xx.push(obj);
      });
      debits.forEach((e: any) => {
        const obj = {
          id: e.id,
          reciever: e["payment-transaction"].receiver,
          amount: e["payment-transaction"].amount,
          fee: e.fee,
        };
        yy.push(obj);
      });
      setInTransactions(xx);
      setOutTransactions(yy);
    }
  };

  const signAndSendTransaction = async (
    reciever: string,
    note: string,
    amount: number
  ) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signAndSendTransaction(reciever, note, amount);

    return result;
  };

  const createAsset = async (
    name: string,
    unitName: string,
    amount: number
  ) => {
    const rpc = new RPC(provider);
    const result = await rpc.createAsset(name, unitName, amount);

    return result;
  };

  //Initialize web3Auth
  useEffect(() => {
    const clientId = WEB3AUTH_CLIENT_ID;
    const init = async () => {
      try {
        const web3auth = new Web3AuthCore({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.OTHER,
          },
        });

        const openLoginAdapter = new OpenloginAdapter({
          adapterSettings: {
            network: "testnet",
            clientId: clientId,
            uxMode: "redirect", // other option: popup
            loginConfig: {
              jwt: {
                name: "Morty Wallet Login",
                verifier: "morty-firebase-verifier",
                typeOfLogin: "jwt",
                clientId: "mortywalletng",
              },
            },
          },
        });

        web3auth.configureAdapter(openLoginAdapter);

        setWeb3auth(web3auth);

        await web3auth.init();

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  //Unscribe from Authlistner
  useEffect(() => {
    const cancelAuthListener = auth.onIdTokenChanged(async (userToken: any) => {
      if (userToken) {
        const userData = await mapUserData(userToken);
        setUserCookie(userData);
        setUser(userData);
      } else {
        removeUserCookie();
        setUser(null);
      }
    });

    const userFromCookie = getUserFromCookie();

    if (!userFromCookie) {
      return;
    }
    setUser(userFromCookie);

    cancelAuthListener();
  }, []);

  //Listen to UnAuthStateChange
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (provider) {
      if (!web3Profile) {
        getWeb3Profile();
      }
    }
  });

  ///Fetch Current Exchange Rate
  useEffect(() => {
    if (!defaultRate) {
      priceFetcher();
    }
  });

  ///Fetch History Prices
  useEffect(() => {
    if (!historyPrices) {
      historyFetcher();
    }
  });

  ///Fetch Current Symbol from default currency
  useEffect(() => {
    const x = getSymbolFromCurrency(defaultCurrency);
    if (!defaultSymbol) {
      setDefaultSymbol(x);
    }
  });

  ///Fetch Account
  useEffect(() => {
    if (!account) {
      getAccounts();
    }
  });

  // Fetch KeyPairs
  useEffect(() => {
    if (!keyPairs) {
      onGetAlgorandKeypair();
    }
  });

  //Fetch ccount Balance
  useEffect(() => {
    if (!balance) {
      if (keyPairs) {
        fetchBalance();
      }
    }
  });

  //Fetch Transaction history
  useEffect(() => {
    if (!inTransactions) {
      fetchTransactionHistory();
    }
  });

  return (
    <GlobalContext.Provider
      value={{
        userObject,
        setUserObject,
        mapUserData,
        user,
        logout,
        setUserCookie,
        getUserFromCookie,
        showDialog,
        setShowDialog,
        historyPrices,
        defaultRate,
        defaultCurrency,
        setDefaultCurrency,
        defaultSymbol,
        web3Logout,
        loginWeb3,
        keyPairs,
        account,
        fetchBalance,
        signMessage,
        signAndSendTransaction,
        balance,
        setTwitterAuthCredential,
        twitterAuthCredential,
        facebookAccessToken,
        setFacebookAccessToken,
        outTransactions,
        inTransactions,
        createAsset,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
