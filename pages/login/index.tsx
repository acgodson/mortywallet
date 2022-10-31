import React, { useContext, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Divider,
  useToast,
  VStack,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { AuthContext, GlobalContext } from "../../contexts/contexts";
import { LoginBody, LoginLayout, LogoHeader } from "components/loginComponents";
import { FaFacebook, FaTwitter } from "react-icons/fa";

const auth = getAuth();

const LoginPage = () => {
  const { mapUserData, setUserCookie, loginWeb3 }: any =
    useContext(GlobalContext);
  let router = useRouter();
  const toast = useToast();
  function navigate(path: string) {
    router.push(path);
  }
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [allowPassword, setAllowPassword] = useState<boolean>(false);

  async function signIn(email: string, password: string) {
    console.log(email);
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

  function handleSignIn() {
    signIn(email, password);
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
                >
                  <FaTwitter />
                  <Text ml={4}>Continue with Twitter</Text>
                </Button>
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
                >
                  <FaFacebook />
                  <Text ml={4}>Continue with Facebook</Text>
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
