import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Slide,
  Box,
  useDisclosure,
  Spinner,
  HStack,
  Divider,
  VStack,
  Text,
  useToast,
  Stack,
} from "@chakra-ui/react";
import NavBar from "components/NavBar";
import SendNoSection from "./sendCrypto";
import UpgradeSection from "./shopSection";
import { useRouter } from "next/router";
import {
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { GlobalContext } from "../contexts/contexts";
import SideNav from "components/sidenav";
import RecieveCryptoSection from "./recieveCrypto";
import CreateAssetSection from "./createAsset";

const SettingsSection = (props: { user: any }) => {
  const auth = getAuth();
  const toast = useToast();
  const userObject = props.user;
  const { user, logout }: any = useContext(GlobalContext);
  const { isOpen, onToggle } = useDisclosure();

  let router = useRouter();
  // function navigate(path: string) {
  //   router.push(path);
  // }
  const [closeUpgrade, setCloseUpgrade] = useState(true);
  const [closeSend, setCloseSend] = useState(true);
  const [page, setPage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      if (!closeUpgrade && closeSend) {
        onToggle();
      }

      if (!closeSend && closeUpgrade) {
        onToggle();
      }
    }
  }, [closeUpgrade, onToggle, closeSend, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setCloseUpgrade(true);
      setCloseSend(true);
    }
  }, [isOpen]);

  async function verifyEmail() {
    try {
      sendEmailVerification(auth.currentUser).then(() => {
        toast({
          title: "Verification link Sent",
          description: "check your inbox or spam folder for instructions",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e,
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  }

  async function resetPassword() {
    try {
      await sendPasswordResetEmail(auth, userObject.email);
      toast({
        title: "Reset link Sent",
        description: "check your inbox or spam folder for instructions",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e,
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  }

  return (
    <>
      <>
        <SideNav
          index={1}
          onCreateAsset={() => {
            setPage("asset");
            setCloseSend(false);
          }}
        />

        <Box minH="100vh" w="100%" bgColor="whitesmoke" display="flex">
          {closeUpgrade && closeSend && (
            <NavBar
              onSend={() => {
                ///Set Send Page
                setPage("send");
                setCloseSend(false);
              }}
              onLogOut={logout}
              index={0}
              onRecieve={() => {
                setPage("recieve");
                setCloseSend(false);
              }}
              onShop={() => {
                setCloseUpgrade(false);
              }}
            />
          )}

          <Box
            w="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            ml={["0", "0", "300px"]}
            px={3}
          >
            <Box pt="60px" />

            <Stack
              w="100%"
              direction={["column", "column", "row"]}
              justifyContent="start"
              alignItems="start"
              pt="30px"
            >
              <VStack
                spacing={2}
                alignItems="start"
                justifyContent="start"
                px={3}
              >
                <Box
                  as="span"
                  ml={0}
                  fontSize="26px"
                  fontWeight="700"
                  color="rgb(53, 63, 82)"
                  opacity={0.9}
                >
                  Settings
                </Box>

                <Box
                  fontWeight="700"
                  letterSpacing={0.5}
                  color="blue.500"
                  opacity={0.8}
                  mt={3}
                  px={3}
                >
                  Profile
                </Box>

                <VStack
                  justifyContent="start"
                  width="100%"
                  alignItems="start"
                  px={3}
                  py={2}
                >
                  <Text fontWeight="700">Wallet ID</Text>
                  <Text color="grey">{userObject.uid}</Text>
                </VStack>

                <VStack
                  justifyContent="start"
                  width="100%"
                  alignItems="start"
                  px={3}
                  py={2}
                >
                  <Text fontWeight="700">Country</Text>
                  <Text color="grey">{userObject.country}</Text>
                </VStack>

                <VStack
                  justifyContent="start"
                  width="100%"
                  alignItems="start"
                  px={3}
                  py={2}
                >
                  <Text fontWeight="700">Mobile</Text>
                  <Text color="grey">
                    {userObject.phone.length < 2
                      ? "not specified"
                      : userObject.phone}
                  </Text>
                </VStack>

                <Divider />

                <Box
                  fontWeight="700"
                  letterSpacing={0.5}
                  color="blue.500"
                  opacity={0.8}
                  mt={3}
                  px={3}
                >
                  Security
                </Box>

                <HStack width="100%" px={3} justifyContent="space-between">
                  <Text>Change Password</Text>
                  <Button onClick={() => resetPassword()}>Reset</Button>
                </HStack>
              </VStack>
            </Stack>
          </Box>

          {!closeUpgrade && (
            <Slide direction="right" in={isOpen} style={{ zIndex: 10 }}>
              <UpgradeSection onToggle={onToggle} />
            </Slide>
          )}

          {!closeSend && (
            <Slide direction="right" in={isOpen} style={{ zIndex: 10 }}>
              {page === "send" ? (
                <SendNoSection
                  onToggle={onToggle}
                  onRecieve={() => setPage("recieve")}
                />
              ) : page === "recieve" ? (
                <RecieveCryptoSection onToggle={onToggle} />
              ) : page === "asset" ? (
                <CreateAssetSection
                  onToggle={onToggle}
                  // onRecieve={() => setPage("asset")}
                />
              ) : (
                <Box />
              )}
            </Slide>
          )}
        </Box>
      </>
    </>
  );
};

export default SettingsSection;
