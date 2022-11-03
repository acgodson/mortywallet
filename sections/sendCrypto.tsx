import React, { useContext, useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { GlobalContext } from "contexts/contexts";
import {
  Box,
  IconButton,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import CustomLoading from "components/loader";
// import RPC from "../utils/algorandRPC";

const SendNoSection = (props: {
  onToggle: () => void;
  onRecieve: () => void;
}) => {
  const { balance, defaultRate }: any = useContext(GlobalContext);

  let figure = balance * defaultRate;

  return (
    <Box
      width="100%"
      position="absolute"
      overflow="hidden"
      minH="100vh"
      bgColor="blackAlpha.500"
      top="0"
    >
      <Box
        w={["100%", "100%", "500px"]}
        bgColor="white"
        h="100vh"
        float="right"
        px={[3, 3, 6]}
        pt={2}
        pb={10}
      >
        {balance < 5 ? (
          <NoMoney onToggle={props.onToggle} onRecieve={props.onToggle} />
        ) : (
          <SendMoney
            onToggle={props.onToggle}
            balance={figure}
            rate={defaultRate}
          />
        )}
      </Box>
    </Box>
  );
};

export default SendNoSection;

const SendMoney = (props: {
  onToggle: () => void;
  balance: number;
  rate: number;
}) => {
  const {
    provider,
    account,
    balance,
    defaultRate,
    signAndSendTransaction,
  }: any = useContext(GlobalContext);
  const [amount, setAmount] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [verifiedAddress, setVerifiedAddress] = useState(false);
  const [note, setNote] = useState<string>(" ");
  const [txtID, setTxtID] = useState<string | null>(null);

  const toast = useToast();

  // const rpc = new RPC(provider);

  // async function checkAddress() {
  //   await rpc.isAlgorandAddress(address);
  // }

  async function SendTransaction() {
    try {
      setSubmitting(true);
      const algo = amount / props.rate;
      const xAlgo = Math.round(algo * 100000);

      console.log(xAlgo);

      const id = await signAndSendTransaction(address, note, xAlgo);

      if (id) {
        setTxtID(id);
        setSubmitting(false);
      }
    } catch (e) {
      setSubmitting(false);
      toast({
        title: "Error",
        description: e,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  console.log(account);

  const useMax = () => setAmount(balance * defaultRate);

  useEffect(() => {
    if (!verifiedAddress) {
      if (address.length === 58) {
        setVerifiedAddress(true);
      }
    }
  });

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading
          sx={{
            color: "rgb(18, 29, 51",
          }}
          as="h6"
          fontWeight="600"
          fontSize="24px"
        >
          Send
        </Heading>

        <IconButton
          size={"md"}
          color="grey"
          borderRadius="50%"
          bgColor="whitesmoke"
          icon={<CloseIcon />}
          aria-label={"Open Menu"}
          display={["inherit", "inherit", "inherit"]}
          onClick={() => {
            props.onToggle();
            setTxtID(null);
          }}
        />
      </Box>

      {submitting ? (
        <CustomLoading />
      ) : (
        <>
          {!txtID && (
            <Box>
              <FormControl mt={10} px={3}>
                <FormLabel color="black.200" ml={1.5} key={"address"}>
                  Address
                </FormLabel>

                <Input
                  id="address"
                  color="grey"
                  fontSize="sm"
                  type={"text"}
                  placeholder="Enter Algo address"
                  required={true}
                  readOnly={false}
                  value={address}
                  size="lg"
                  onChange={(event) => setAddress(event.currentTarget.value)}
                  bg="whitesmoke"
                />
              </FormControl>

              <FormControl mt={10} px={3}>
                <FormLabel color="black.200" ml={1.5} key={"amount"}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      Balance:
                      <Box as="span" color="grey">
                        {" "}
                        ${props.balance}
                      </Box>
                    </Box>
                    <Button
                      color="blue"
                      bgColor="transparent"
                      onClick={() => useMax()}
                    >
                      Use Max
                    </Button>
                  </Box>
                </FormLabel>

                <Input
                  id="amount"
                  color="grey"
                  fontSize="sm"
                  type={"number"}
                  placeholder="Enter Amount"
                  required={true}
                  readOnly={false}
                  value={amount}
                  size="lg"
                  onChange={(e) => setAmount(parseInt(e.currentTarget.value))}
                  bg="whitesmoke"
                />
              </FormControl>

              {amount > props.balance ? (
                <Text ml={3} my={0} fontSize="xs" color="red">
                  Insufficent Balance
                </Text>
              ) : (
                <Box />
              )}

              <Text textAlign="center" my={3} fontSize="xs">
                <Box as="span" color="grey">
                  {" "}
                  {amount / props.rate}{" "}
                </Box>{" "}
                ALGO
              </Text>

              <FormControl mt={10} px={3}>
                <FormLabel color="black.200" ml={1.5} key={"note"}>
                  Note
                </FormLabel>

                <Input
                  id="note"
                  color="grey"
                  fontSize="sm"
                  type={"text"}
                  placeholder="Transaction note"
                  required={true}
                  readOnly={false}
                  value={note}
                  size="lg"
                  onChange={(event) => setNote(event.currentTarget.value)}
                  bg="whitesmoke"
                />
              </FormControl>

              <Button
                variant="solid"
                type="submit"
                width="full"
                height="48px"
                bg="blue"
                mt={4}
                loadingText="Submitting"
                colorScheme={"blue.500"}
                disabled={verifiedAddress ? false : true}
                onClick={() => SendTransaction()}
              >
                Continue
              </Button>
            </Box>
          )}

          {txtID && (
            <>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box as="img" src="/grey-verified.svg" height="100px" />
                <Heading
                  textAlign="center"
                  as="h6"
                  fontWeight="bold"
                  fontSize="24px"
                  color="grey"
                >
                  Transaction Successful
                </Heading>
                {/* <Box px={3}>
                  <Text>{txtID}</Text>
                </Box> */}
                <Link
                  target="_blank"
                  href={`https://testnet.algoexplorer.io/tx/${txtID}`}
                >
                  <Button
                    mx={3}
                    variant="solid"
                    type="submit"
                    width="full"
                    height="48px"
                    bg="blue.500"
                    mt={4}
                    loadingText="Submitting"
                    colorScheme={"blue.500"}
                    onClick={props.onToggle}
                  >
                    View on Algo Explorer
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

const NoMoney = (props: { onToggle: () => void; onRecieve: () => void }) => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading
          sx={{
            color: "rgb(18, 29, 51",
          }}
          as="h6"
          fontWeight="600"
          fontSize="24px"
        >
          Send
        </Heading>

        <IconButton
          size={"md"}
          color="grey"
          borderRadius="50%"
          bgColor="whitesmoke"
          icon={<CloseIcon />}
          aria-label={"Open Menu"}
          display={["inherit", "inherit", "inherit"]}
          onClick={props.onToggle}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={8}
      >
        <Box as="img" src="send-no-funds-promo.svg" height="200px" />

        <Heading
          my={3}
          mr={3}
          sx={{
            color: "rgb(18, 29, 51)",
          }}
          as="h6"
          fontWeight="600"
          fontSize="18px"
          textAlign="center"
        >
          Looks like you don't have enough funds yet
        </Heading>

        <Text fontWeight="semibold" color="gray" textAlign="center">
          Buy or Recieve crypto to fund your wallet
        </Text>
      </Box>

      <Box>
        <Button
          variant="solid"
          type="submit"
          width="full"
          height="48px"
          bg="blue"
          mt={4}
          loadingText="Submitting"
          colorScheme={"blue.500"}
          onClick={props.onToggle}
        >
          Buy Crypto
        </Button>

        <Button
          variant="solid"
          type="submit"
          width="full"
          height="48px"
          bgColor="transparent"
          border="2px solid whitesmoke"
          color="blue.500"
          mt={4}
          loadingText="Submitting"
          colorScheme={"blue.500"}
          onClick={props.onRecieve}
        >
          Recieve Crypto
        </Button>
      </Box>
    </>
  );
};

// txId: '5ULMCEUAKO2X6BMC63WQN3WVR7WU6LU76YELUKAKDIREMQNOEYHQ'
