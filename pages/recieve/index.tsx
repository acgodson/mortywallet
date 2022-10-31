import React, { useContext, useEffect, useState } from "react";
import { Box, IconButton, Heading, VStack, Spinner } from "@chakra-ui/react";
import { CloseIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import WalletTile from "../../sections/walletTile";
import { GlobalContext } from "../../contexts/contexts";

const ReceiveSection = () => {
  let router = useRouter();
  const { user, logout, account }: any = useContext(GlobalContext);

  function navigate() {
    router.back();
  }

  return (
    <Box
      width="100%"
      px={6}
      pt={2}
      pb={3}
      position="absolute"
      overflow="auto"
      minH="100vh"
      bgColor="white"
      top="0"
      zIndex={9999999}
    >
      {/* Navigation */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading
          sx={{
            color: "rgb(18, 29, 51",
          }}
          as="h6"
          fontWeight="600"
          fontSize="24px"
        >
          <ArrowDownIcon color="blue.500" />
        </Heading>

        <IconButton
          size={"md"}
          color="grey"
          borderRadius="50%"
          bgColor="whitesmoke"
          icon={<CloseIcon />}
          aria-label={"Open Menu"}
          display={["inherit", "none", "none"]}
          onClick={() => navigate()}
        />
      </Box>

      <VStack width="100%" spacing={1} pt="30px" px={2} alignItems="start">
        <VStack spacing={2} alignItems="start" justifyContent="start">
          <Box
            as="span"
            ml={0}
            fontSize="26px"
            fontWeight="700"
            color="rgb(53, 63, 82)"
            opacity={0.9}
          >
            Receive Crypto
          </Box>
        </VStack>

        <Box
          fontWeight="700"
          letterSpacing={0.5}
          color="rgb(53, 63, 82)"
          opacity={0.8}
        >
          Select and share your address or QR code to recieve crypto from anyone
          around the world{" "}
        </Box>

        <Box
          py={10}
          width="100%"
          flexDirection="column"
          display="flex"
          justifyContent="center"
        >
          {/* (
            allWallets.map((x) => (
            
            ))
          )  */}

          {account ? (
            <WalletTile
              key={account}
              address={account}
              disabled={false}
              type={"Algo"}
              balance={`\$0`}
            />
          ) : (
            <Spinner />
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default ReceiveSection;
