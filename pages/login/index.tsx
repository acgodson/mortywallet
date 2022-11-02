import React, { useContext, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  TwitterAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/router";
import { AuthContext, GlobalContext } from "../../contexts/contexts";
import { LoginBody, LoginLayout, LogoHeader } from "components/loginComponents";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { createUser } from "db/firestore";

const auth = getAuth();
const tProvider = new TwitterAuthProvider();
const fProvider = new FacebookAuthProvider();
const LoginPage = () => {
  const {
    mapUserData,
    setUserCookie,
    loginWeb3,
    twitterAuthCredential,
    setTwitterAuthCredential,
    facebookAccessToken,
    setFacebookAccessToken,
  }: any = useContext(GlobalContext);
  let router = useRouter();
  const toast = useToast();
  function navigate(path: string) {
    router.push(path);
  }
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [allowPassword, setAllowPassword] = useState<boolean>(false);

  async function signIn(email: string, password: string) {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // User credential from custom Auth
          const user = userCredential.user;

          // Sign in web3auth
          await loginWeb3(userCredential);

          //Save Browser Cookie
          const userData = await mapUserData(user);
          setUserCookie(userData);

          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } catch (e: any) {
      console.log(e);
    }
  }

  async function signInWithTwitter() {
    try {
      signInWithPopup(auth, tProvider)
        .then(async (result) => {
          const credential = TwitterAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const secret = credential.secret;

          const TwitterAuthOBJ = {
            credential: credential,
            token: token,
            secret: secret,
          };

          //Save twitter details for accesing Twitter API later
          setTwitterAuthCredential(TwitterAuthOBJ);

          // User credential from custom Auth
          const user = result.user;

          // Sign in web3auth
          await loginWeb3(result);

          //Save Browser Cookie
          const userData = await mapUserData(user);
          setUserCookie(userData);

          navigate("/home");
        })

        .catch((error) => {
          const errorCode = error.code;
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });

          // const email = error.customData.email;
          //  const credential = TwitterAuthProvider.credentialFromError(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function siginInWithFacebook() {
    fProvider.addScope(" pages_show_list");
    fProvider.addScope("pages_read_engagement");
    fProvider.addScope("pages_manage_posts");
    fProvider.addScope("public_profile ");
    fProvider.addScope("user_location ");

    signInWithPopup(auth, fProvider)
      .then(async (result) => {
        // The signed-in user info.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        //Save facebook access token for accesing facebook API later
        setFacebookAccessToken(accessToken);

        // User credential from custom Auth
        const user = result.user;

        // Update User in db
        await createUser(user.email, "", user.uid);

        // Sign in web3auth
        await loginWeb3(result);
        //Save Browser Cookie
        const userData = await mapUserData(user);
        setUserCookie(userData);

        navigate("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // ...
      });
  }

  function handleSignIn() {
    signIn(email, password);
  }

  function handleSocialSignIn() {
    siginInWithFacebook();
  }

  return (
    <>
      <LoginLayout>
        <Box
          as="img"
          src="/bg-pattern.svg"
          alt="bgg"
          height="auto"
          width="100%"
        />

        <LogoHeader />

        <LoginBody>
          <TabPanels>
            <TabPanel>
              {!allowPassword && (
                <>
                  <FormControl mt={10} px={3}>
                    <FormLabel color="black.200" ml={1.5} key={"name"}>
                      Email Address
                    </FormLabel>

                    <Input
                      id="mail"
                      color="grey"
                      fontSize="sm"
                      type={"email"}
                      value={email}
                      placeholder="Enter your email address"
                      required={true}
                      readOnly={false}
                      size="lg"
                      onChange={(event) => setEmail(event.currentTarget.value)}
                      bg="whitesmoke"
                    />
                  </FormControl>

                  <Box px={2.5}>
                    <Button
                      variant="solid"
                      type="submit"
                      width="full"
                      height="48px"
                      mt={4}
                      loadingText="Submitting"
                      bgColor="blue.500"
                      color="white"
                      opacity={email.length < 1 ? 0.2 : 1}
                      onClick={
                        email.length < 5 ? null : () => setAllowPassword(true)
                      }
                    >
                      Continue
                    </Button>
                  </Box>
                </>
              )}

              {allowPassword && (
                <>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={2}
                  >
                    <Button
                      bgColor="white"
                      mr={2}
                      onClick={() => setAllowPassword(false)}
                      color="grey"
                      fontSize="md"
                    >
                      <Box as="span" color="blue.500">
                        <ArrowBackIcon />
                      </Box>
                      Back
                    </Button>
                    <Box fontSize="xs" fontWeight="bold" color="blue.500">
                      {email}
                    </Box>
                  </Box>

                  {/* <form> */}
                  <FormControl mt={10} px={3}>
                    <FormLabel color="black.200" ml={1.5} key={"name"}>
                      Password
                    </FormLabel>

                    <Input
                      id="password"
                      color="grey"
                      fontSize="sm"
                      type={"password"}
                      value={password}
                      placeholder="Enter your Password"
                      required={true}
                      readOnly={false}
                      size="lg"
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                      bg="whitesmoke"
                    />
                  </FormControl>

                  <Box px={2.5}>
                    <Button
                      variant="solid"
                      type="submit"
                      width="full"
                      height="48px"
                      mt={4}
                      loadingText="Submitting"
                      bgColor="blue.500"
                      color="white"
                      opacity={email.length < 1 ? 0.2 : 1}
                      onClick={() => handleSignIn()}
                    >
                      Log in
                    </Button>
                  </Box>
                </>
              )}
            </TabPanel>

            <TabPanel>
              <Box px={2.5}>
                <Text
                  variant="h3"
                  fontWeight="bold"
                  color="orange"
                  textAlign="center"
                >
                  Sell Faster on Morty{" "}
                </Text>
                <Text
                  mb={3}
                  variant="h4"
                  fontSize="sm"
                  color="#333"
                  fontWeight="semibold"
                >
                  Create a verifiable wallet & store by signing in with your
                  social account, and let your followers pay for assets or
                  services posted on your timeli ne from morty
                </Text>
                <Button
                  variant="solid"
                  type="submit"
                  width="full"
                  height="48px"
                  mt={4}
                  loadingText="Submitting"
                  bgColor="blue"
                  color="white"
                  justifyContent="flex-start"
                  onClick={handleSocialSignIn}
                >
                  <FaFacebook />
                  <Text ml={4}>Continue with Facebook</Text>
                </Button>

                <Button
                  variant="solid"
                  type="submit"
                  width="full"
                  height="48px"
                  mt={4}
                  loadingText="Submitting"
                  bgColor="blue.500"
                  color="white"
                  justifyContent="flex-start"
                  disabled={true}
                >
                  <FaTwitter />
                  <Text ml={4}>Continue with Twitter</Text>
                </Button>
              </Box>
            </TabPanel>
          </TabPanels>
        </LoginBody>
      </LoginLayout>
    </>
  );
};

export default LoginPage;
