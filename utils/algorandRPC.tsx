import { SafeEventEmitterProvider } from "@web3auth/base";
import algosdk from "algosdk";
import { ALGO_API_KEY } from "../config";

const algodToken = {
  "x-api-key": ALGO_API_KEY,
};
const algodServer = "https://testnet-algorand.api.purestake.io/idx2";
const algodPort = "";

const indexerClient = new algosdk.Indexer(algodToken, algodServer, algodPort);

export default class AlgorandRPC {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  getAlgorandKeyPair = async (): Promise<any> => {
    const privateKey = (await this.provider.request({
      method: "private_key",
    })) as string;
    var passphrase = algosdk.secretKeyToMnemonic(
      Buffer.from(privateKey, "hex")
    );
    var keyPair = algosdk.mnemonicToSecretKey(passphrase);
    return keyPair;
  };

  getAccounts = async (): Promise<any> => {
    const keyPair = await this.getAlgorandKeyPair();
    return keyPair.addr;
  };

  getBalance = async (): Promise<any> => {
    const keyPair = await this.getAlgorandKeyPair();
    const client = await this.makeClient();
    const balance = await client.accountInformation(keyPair.addr).do();
    return balance.amount;
  };

  makeClient = async (): Promise<any> => {
    const algodToken = {
      "x-api-key": ALGO_API_KEY,
    };
    const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
    const algodPort = "";
    let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    const client = algodClient;
    return client;
  };

  signMessage = async (): Promise<any> => {
    const keyPair = await this.getAlgorandKeyPair();
    const client = await this.makeClient();
    const params = await client.getTransactionParams().do();
    const enc = new TextEncoder();
    const message = enc.encode("Web3Auth says hello!");
    const txn = algosdk.makePaymentTxnWithSuggestedParams(
      keyPair.addr,
      keyPair.addr,
      0,
      undefined,
      message,
      params
    );
    let signedTxn = algosdk.signTransaction(txn, keyPair.sk);
    let txId = signedTxn.txID;
    return txId;
  };

  signAndSendTransaction = async (): Promise<any> => {
    try {
      const keyPair = await this.getAlgorandKeyPair();
      const client = await this.makeClient();
      const params = await client.getTransactionParams().do();
      const enc = new TextEncoder();
      const message = enc.encode("Web3Auth says hello!");

      // You need to have some funds in your account to send a transaction
      // You can get some testnet funds here: https://bank.testnet.algorand.network/

      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        keyPair.addr, // sender
        keyPair.addr, // receiver
        1000,
        undefined,
        message,
        params
      );
      let signedTxn = algosdk.signTransaction(txn, keyPair.sk);

      const txHash = await client.sendRawTransaction(signedTxn.blob).do();

      return txHash.txId;
    } catch (error) {
      console.log(error);
    }
  };

  fetchTransactions = async (
    address: string,
    startTime: string | null
  ): Promise<any> => {
    try {
      let limit = 5;
      let transactionInfo = startTime
        ? await indexerClient
            .searchForTransactions()
            .address(address)
            .afterTime(startTime)
            .do()
        : await indexerClient.searchForTransactions().address(address).do();

      if (transactionInfo) {
        const info = transactionInfo;
        console.log(info);
        return info;
      }
      console.log("transaction has been retrived");
    } catch (e) {
      console.log(e);
      console.trace();
    }
  };

  fetchSellersAssets = async (address: string): Promise<any> => {
    try {
      let response = await indexerClient
        .lookupAccountCreatedAssets(address)
        .do();
      if (response) {
        const info = JSON.stringify(response, undefined, 2);
        console.log(info);
        return info;
      }
    } catch (e) {
      console.log(e);
    }
  };

  isAlgorandAddress = async (address: string): Promise<any> => {
    try {
      const client = await this.makeClient();
      const decode = client.decodeAddress(address);
      return true;
    } catch (ex) {
      return false;
    }
  };
}
