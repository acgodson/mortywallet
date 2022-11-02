import React, { useContext, useEffect, useState } from "react";
import {

  Slide,
  Box,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import NavBar from "components/NavBar";
import SendNoSection from "./sendCrypto";
import UpgradeSection from "./shopSection";
import { useRouter } from "next/router";
import { GlobalContext } from "../contexts/contexts";
import AssetsTrade from "components/assetsTrade";
import WalletOverView from "components/walletOverview";
import SideNav from "components/sidenav";
import RecieveCryptoSection from "./recieveCrypto";

const HomeSection = (props: { user: any }) => {
  const { logout }: any = useContext(GlobalContext);
  const { isOpen, onToggle } = useDisclosure();
  const [closeSend, setCloseSend] = useState(true);
  const [closeUpgrade, setCloseUpgrade] = useState(true);
  const [page, setPage] = useState("");
  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }

  function handleBuy() {
    ///Open dialog box and link to get faucet funds
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

  return (
    <>
      <SideNav index={0} />

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
            justifyContent="center"
            alignItems="start"
            pt="30px"
          >
            <WalletOverView />

            <AssetsTrade
              buy={() => handleBuy()}
              swap={() => {
                ///Set to Swap Page
                setPage("send");
                setCloseSend(false);
              }}
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
            {page === "send" ? (
              <SendNoSection
                onToggle={onToggle}
                onRecieve={() => setPage("recieve")}
              />
            ) : page === "recieve" ? (
              <RecieveCryptoSection onToggle={onToggle} />
            ) : (
              <Box />
            )}
          </Slide>
        )}
      </Box>
    </>
  );
};

export default HomeSection;
