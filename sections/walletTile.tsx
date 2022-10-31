import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const WalletTile = (props: {
  type: string;
  balance: string;
  disabled: boolean;
  address: string;
}) => {
  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }
  return (
    <Link
      href={
        props.disabled
          ? ""
          : {
              pathname: "/scan",
              query: { address: props.address, type: props.type },
            }
      }
    >
      <Box
        _hover={{
          backgroundColor: props.disabled ? "transparent" : "blue.100",
        }}
        cursor={props.disabled ? "none" : "pointer"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        h="80px"
        py={2}
        px={3}
        width="100%"
      >
        <Box display="flex" alignItems="center">
          <Box
            as="img"
            src={props.type == "Algo" ? "/algo.svg" : "usd.png"}
            height="30px"
          ></Box>
          <VStack spacing={0} ml={2} alignItems="flex-start" textAlign="left">
            <Box as="span" ml={0} fontSize="18px" fontWeight="700" color="grey">
              {props.balance.length > 20 ? props.type : "Private key Wallet"}
            </Box>
            <Box as="span" ml={2} fontSize="sm" fontWeight="500" color="grey">
              {props.balance}
            </Box>
          </VStack>
        </Box>

        {!props.disabled && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <ChevronRightIcon fontWeight="bold" fontSize="22px" />
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default WalletTile;
