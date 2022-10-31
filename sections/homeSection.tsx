import React, { useContext, useEffect, useState } from "react";
import { ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Text,
  MenuItem,
  Slide,
  Box,
  Container,
  Divider,
  useDisclosure,
  useToast,
  Stack,
  VStack,
} from "@chakra-ui/react";
import NavBar from "components/NavBar";
import SendNoSection from "./sendCrypto";
import UpgradeSection from "./upgrade";
import { useRouter, withRouter } from "next/router";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { GlobalContext } from "../contexts/contexts";
import AlertBanner from "components/alertBanner";
import AssetsTrade from "components/assetsTrade";
import WalletOverView from "components/walletOverview";
import SideNav from "components/sidenav";

const HomeSection = (props: { user: any }) => {
  const { user, logout, defaultRate, defaultSymbol, balance }: any =
    useContext(GlobalContext);
  const toast = useToast();
  const auth = getAuth();
  const { isOpen, onToggle } = useDisclosure();
  const [closeSend, setCloseSend] = useState(true);
  const [closeUpgrade, setCloseUpgrade] = useState(true);
  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }

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

  return (
    <>
      <SideNav index={0} />

      <Box minH="100vh" w="100%" bgColor="whitesmoke" display="flex">
        {closeUpgrade && closeSend && (
          <NavBar
            onSend={() => {
              setCloseSend(false);
            }}
            onLogOut={logout}
            index={0}
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
          {auth.currentUser && auth.currentUser.emailVerified !== false ? (
            <AlertBanner
              title="Verification Needed"
              description="  Please re-verify your email to access our full products
                  and services"
              pressed={() => verifyEmail()}
              buttonTitle="Verify Now"
            />
            ) : <Box pt="60px"/>}

          <Stack
            w="100%"
            direction={["column", "column", "row"]}
            justifyContent="center"
            alignItems="start"
            pt="30px"
          >
            <WalletOverView />

            <AssetsTrade
              buy={() => setCloseUpgrade(false)}
              swap={() => setCloseUpgrade(false)}
            />
          </Stack>
        </Box>

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
    </>
  );
};

export default HomeSection;
