import React, { useContext } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Container, Box, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GlobalContext } from "contexts/contexts";

const WalletOverView = () => {
  const { user, defaultRate, defaultSymbol, balance }: any =
    useContext(GlobalContext);
  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }

  let figure = balance * defaultRate;
  const kFigure = figure.toFixed(2);

  return (
    <>
      <Box
        boxShadow="sm"
        bgColor="white"
        border=" solid 1.5px whitesmoke"
        borderRadius={8}
        py={4}
        px={4}
        w="100%"
        cursor="pointer"
        onClick={() => navigate("/coins/algo")}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box fontWeight="bold">Wallet</Box>
          <Box color="blue" fontSize="sm" fontWeight="bold">
            {/* View Pending */}
            <Box as="span" ml={2}>
              <ArrowForwardIcon />
            </Box>
          </Box>
        </Box>

        <Box
          cursor="pointer"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={5}
        >
          <Box display="flex">
            <Box as="img" src="/usd.png" height="30px"></Box>
            <Box as="span" ml={2} fontSize="22px" fontWeight="500" color="grey">
              Total Balance
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box fontSize="lg" fontWeight="bold" letterSpacing={1} color="grey">
              {defaultSymbol}
              {kFigure}
            </Box>
          </Box>
        </Box>

        <Divider my={3.5} mx={1.5} />

        <Box
          display="flex"
          justifyContent="space-between"
          my={3}
          alignItems="center"
        >
          <Box display="flex">
            <Box as="img" src="algo.svg" height="30px"></Box>
            <Box as="span" ml={2} fontSize="22px" fontWeight="500" color="grey">
              Algo
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box fontSize="sm" fontWeight="bold" letterSpacing={1} color="grey">
              {balance}
            </Box>
          </Box>
        </Box>

        <Box>
          <Box></Box>
        </Box>
      </Box>
    </>
  );
};

export default WalletOverView;
