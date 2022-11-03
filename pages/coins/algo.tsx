import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Container,
  useDisclosure,
  Slide,
  useToast,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import NavBar from "components/NavBar";
import UpgradeSection from "../../sections/shopSection";
import SendNoSection from "../../sections/sendCrypto";
import { GlobalContext } from "contexts/contexts";
import SideNav from "components/sidenav";
import RecieveCryptoSection from "sections/recieveCrypto";
import { useRouter } from "next/router";
import { FaExpand } from "react-icons/fa";
import Link from "next/link";


const Algo = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [closeUpgrade, setCloseUpgrade] = useState(true);
  const [closeSend, setCloseSend] = useState(true);
  const { user, balance, defaultRate, logout, inTransactions }: any =
    useContext(GlobalContext);
  const [page, setPage] = useState("");
  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }
  const [transactions, setTransactions] = useState<any | null>(null);

  useEffect(() => {
    if (!transactions) {
      if (inTransactions) {
        const x = inTransactions;
        if (x.length > 0) {
          setTransactions(x);
        }
      }
    }
  });
  const toast = useToast();
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
    console.log(inTransactions);
  });

  return (
    <>
      <SideNav
        index={0}
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

          <VStack spacing={3} pt="100px" px={[0,0,8]} alignItems="start">
            <Stack
              direction={["column", "column", "row"]}
              w="100%"
              px={[6,6,0]}
              alignItems="center"
            >
              <Box w="100%">
                <VStack spacing={2} alignItems="start" justifyContent="start">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Box as="img" src="/algo.svg" height="35px"></Box>
                    <Box
                      as="span"
                      ml={2}
                      fontSize="26px"
                      fontWeight="700"
                      color="rgb(53, 63, 82)"
                    >
                      Algo
                    </Box>
                  </Box>
                  <HStack>
                    <Box
                      as="button"
                      px={4}
                      fontSize="14px"
                      fontWeight="600"
                      opacity="1"
                      color="rgb(255, 255, 255)"
                      bgColor="rgb(12, 108, 242)"
                      borderRadius="8px"
                      borderStyle="solid"
                      borderWidth="1px"
                      borderColor="rgb(12, 108, 242)"
                      height="40px"
                      _hover={{
                        backgroundColor: "rgb(10, 86, 193)",
                      }}
                      onClick={() => {
                        ///Set Send Page
                        setPage("send");
                        setCloseSend(false);
                      }}
                    >
                      Transfer
                    </Box>
                    <Box
                      as="button"
                      px={4}
                      fontSize="14px"
                      fontWeight="600"
                      opacity="1"
                      color="rgb(255, 255, 255)"
                      bgColor="rgb(12, 108, 242)"
                      borderRadius="8px"
                      borderStyle="solid"
                      borderWidth="1px"
                      borderColor="rgb(12, 108, 242)"
                      height="40px"
                      _hover={{
                        backgroundColor: "rgb(10, 86, 193)",
                      }}
                      onClick={() => {
                        setPage("recieve");
                        setCloseSend(false);
                      }}
                    >
                      Recieve
                    </Box>
                  </HStack>
                </VStack>

                <Box
                  fontWeight="700"
                  fontSize="xs"
                  letterSpacing={0.5}
                  color="rgb(53, 63, 82)"
                  opacity={0.8}
                >
                  Algorand (ALGO) is the best crypto
                </Box>
              </Box>

              <Box width="100%">
                <Container
                  boxShadow="sm"
                  w="100%"
                  bgColor="white"
                  border=" solid 2px whitesmoke"
                  borderRadius={6}
                  py={4}
                  px={2}
                >
                  <VStack alignItems="start" px={2}>
                    <Box
                      textShadow="md"
                      opacity={0.6}
                      as="h6"
                      fontWeight="bold"
                      color="gray"
                    >
                      ALGO Balance
                    </Box>
                    <Box as="h6" fontWeight="bold" color="grey">
                      ${balance * defaultRate} 
                      <br />
                      <Box
                        opacity={0.7}
                        as="span"
                        fontSize="sm"
                        fontWeight="bold"
                        color="grey"
                      >
                        {/* pendng */}
                      </Box>
                    </Box>
                  </VStack>
                </Container>
              </Box>
            </Stack>

            {/* Transactions will show up here */}

            {inTransactions &&
              (inTransactions.length > 0 ? (
                <MyTransactions />
              ) : (
                <NoTransactions onRecieve= {() => {
                  setPage("recieve");
                  setCloseSend(false);
                }} />
              ))}
          </VStack>
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

export default Algo;

const MyTransactions = () => {
  const { user, balance, logout, inTransactions, outTransactions }: any =
    useContext(GlobalContext);
  const [transactions, setTransactions] = useState<any | null>(null);

  useEffect(() => {
    if (!transactions) {
      if (inTransactions) {
        const x = inTransactions;
        if (x.length > 0) {
          setTransactions(x);
        }
      }
    }
  });

  return (
    <Box overflowX="auto"
    
    display="inherit"
    width="100%"
    maxW="700px">
      <TableContainer>
        <Table variant="simple" borderRadius={12}>
          <Thead color="blue.200">
            <Tr>
              <Td>S/N</Td>
              <Td>txID</Td>
              {/* <Td>Sender</Td> */}
              {/* <Td>Reciever</Td> */}
              <Td isNumeric>Amount</Td>
              {/* <Td isNumeric>Fee</Td> */}
              <Td>Explorer</Td>
            </Tr>
          </Thead>

          {transactions &&
            transactions.map((x: any, index: number) => (
              <Tbody key={x.id}>
                <Tr>
                  {/* <Td>{x.created.toDate()}</Td> */}
                  <Td>{index + 1}</Td>
                  <Td w="15px">
                    <Text as="span" width="15px" noOfLines={1} isTruncated>
                      {x.id}
                    </Text>
                  </Td>
                
                  <Td>{x.amount}</Td>
                   <Td>
                    <Link
                     href= {`https://testnet.algoexplorer.io/tx/${x.id}`}
                      target="_blank"
                    >
                     <Button
                      boxShadow="lg"
                      h="32px"
                      bgColor="red.500"
                      color="white"
                      width="25px"
                      py={0}
                      px={2}
                      fontWeight="bold"
                      fontSize="sm"
                    >
                      <FaExpand/>
                    </Button>
                    </Link>
                   
                  </Td>
                </Tr>
              </Tbody>
            ))}
        </Table>
      </TableContainer>
    </Box>
  );
};

const NoTransactions = ( props: {onRecieve: () => void}) => {
  return (
    <>
      <VStack
        spacing={4}
        width="100%"
        pt={9}
        alignItems="center"
        textAlign="center"
      >
        <Text as="h6" fontSize="19px" fontWeight="700" opacity={0.7}>
          Transcations
        </Text>

        <Text px={3} fontSize="15px" fontWeight="700" opacity={0.7}>
          All your Algorand Transcations will show up here
        </Text>

        <Box
          as="button"
          px={4}
          fontSize="14px"
          fontWeight="600"
          opacity="0.7"
          border=" solid 1px rgb(12, 108, 242)"
          color="rgb(12, 108, 242)"
          borderRadius="8px"
          height="40px"
          _active={{
            backgroundColor: "rgb(10, 86, 193)",
            color: "white"
          }}
          _hover={{
            backgroundColor: "rgb(10, 86, 193)",
            color: "white"
          }}
          onClick={props.onRecieve}
        >
          Recieve ALGO Now
        </Box>
      </VStack>
    </>
  );
};
