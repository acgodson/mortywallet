import React, { useContext, useEffect, useState } from "react";
import { ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Container,
  Box,
  Divider,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaCalendar } from "react-icons/fa";
import { GlobalContext } from "contexts/contexts";
import AlertBanner from "./alertBanner";
import { getAuth, sendEmailVerification } from "firebase/auth";
import PieChartSection from "sections/piechartSection";
import { sumArray } from "db/firestore";

const dates = ["All Time", "Today", "Last 7 days", "This nonth"];

const WalletOverView = () => {
  const toast = useToast();
  const auth = getAuth();
  const {
    user,
    defaultRate,
    defaultSymbol,
    balance,
    inTransactions,
    outTransactions,
  }: any = useContext(GlobalContext);
  const [defaultDate, setDefaultDate] = useState<any>(dates[0]);
  const [fetching, setFetching] = useState(true);
  const [totalCredits, setTotalCredits] = useState<any | null>(null);
  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }

  let figure = balance * defaultRate;
  const kFigure = figure.toFixed(2);

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

  function getTotalCredits() {
    if (inTransactions) {
      const totalCredits = inTransactions.map((x: any) => x.amount);
      const sum = sumArray(totalCredits);
      setTotalCredits(sum);
      setFetching(false);
    }
  }

  useEffect(() => {
    if (fetching) {
      getTotalCredits();
    }
  });

  return (
    <Box display="flex" flexDirection="column" py={4} px={4} w="100%">
      {auth.currentUser && !auth.currentUser.emailVerified && (
        <AlertBanner
          title="Verification Needed"
          description="  Please re-verify your email to access our full products
                  and services"
          pressed={() => verifyEmail()}
          buttonTitle="Verify Now"
        />
      )}

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

      <Box
        boxShadow="sm"
        bgColor="white"
        border=" solid 1.5px whitesmoke"
        borderRadius={8}
        py={4}
        px={4}
        mt={3}
        w="100%"
        cursor="pointer"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Menu>
              <Box
                display="flex"
                justifyContent="center"
                my={3}
                alignItems="center"
              >
                <Box
                  as="span"
                  ml={2}
                  fontSize="sm"
                  fontWeight="500"
                  color="grey"
                >
                  {defaultDate}
                </Box>
                <MenuButton
                  _active={{
                    border: "none",
                    backgroundColor: "white",
                  }}
                  _focus={{
                    border: "none",
                    backgroundColor: "white",
                  }}
                  bgColor="white"
                  border="none"
                  fontWeight="bold"
                  fontSize="xl"
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                />
              </Box>

              {/* assetList */}
              <MenuList>
                {dates.map((x) => (
                  <MenuItem
                    key={x + 0}
                    minH="48px"
                    bgColor="white"
                    w="200px"
                    onClick={() => setDefaultDate(x)}
                  >
                    <FaCalendar color="grey" />

                    <Box as="span" ml={2}>
                      {x}
                    </Box>
                  </MenuItem>
                ))}{" "}
              </MenuList>
            </Menu>
          </Box>

          <Box color="blue" fontSize="sm" fontWeight="bold">
            SCHEDULED PAYMENTS
          </Box>
        </Box>

        {!fetching ? (
          <HStack justifyContent="center" width="100%" py={12}>
            <PieChartSection in={totalCredits} out={0} />
          </HStack>
        ) : (
          <HStack w="100%" justifyContent="center" py={12}>
            <Spinner />
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default WalletOverView;
