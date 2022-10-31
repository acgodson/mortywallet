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
} from "@chakra-ui/react";
import NavBar from "components/NavBar";
import SendNoSection from "./sendCrypto";
import UpgradeSection from "./upgrade";
import { useRouter } from "next/router";
import * as FirestoreService from "../db/firestore";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { GlobalContext } from "../contexts/contexts";

const SettingsSection = (props: { user: any }) => {
  const auth = getAuth();
  const toast = useToast();
  const userObject = props.user;
  const { user, logout }: any = useContext(GlobalContext);
  const coinz = ["Bitcoin", "Ether", "Bitcoin Cash"];
  const { isOpen, onToggle } = useDisclosure();

  let router = useRouter();
  // function navigate(path: string) {
  //   router.push(path);
  // }
  const [defaultCoin, setDefaultCoin] = useState("Bitcoin");
  const [closeUpgrade, setCloseUpgrade] = useState(true);
  const [closeSend, setCloseSend] = useState(true);
  const coins = coinz.filter((x) => x !== defaultCoin);
  const [allWallets, setAllWallets] = useState<any[]>();

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

  useEffect(() => {
    async function fetchWallet() {
      try {
        const data = await FirestoreService.getAllWallets();
        if (data) {
          console.log(data);
          setAllWallets(data);
        }
      } catch (e) {}
    }

    if (user) {
      fetchWallet();
    }
  }, [user]);

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
      <main>
        <Box minH="100vh" pt="100px">
          {closeUpgrade && closeSend && (
            <NavBar
              onSend={() => {
                setCloseSend(false);
              }}
              onLogOut={logout}
              index={2}
            />
          )}

          <VStack spacing={2} alignItems="start" justifyContent="start" px={3}>
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

          {!closeUpgrade && (
            <Slide direction="right" in={isOpen} style={{ zIndex: 10 }}>
              <UpgradeSection onToggle={onToggle} />
            </Slide>
          )}

          {!closeSend && (
            <Slide direction="right" in={isOpen} style={{ zIndex: 10 }}>
              <SendNoSection onToggle={onToggle} />
            </Slide>
          )}
        </Box>
      </main>
    </>
  );
};

export default SettingsSection;
