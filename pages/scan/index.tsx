import React, { useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Box,
  IconButton,
  Heading,
  VStack,
  Divider,
  HStack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon, ArrowBackIcon, CopyIcon } from "@chakra-ui/icons";
import { useRouter, withRouter } from "next/router";
import WalletTile from "../../components/walletTile";
import { ReactQrCode } from "@devmehq/react-qr-code";
import { GlobalContext } from "contexts/contexts";

const ShareSection = ({ router: { query } }) => {
  const { balance }: any = useContext(GlobalContext);
  const wallet: string = query.address;
  const type = query.type;
  const toast = useToast();
  let router = useRouter();
  function navigate() {
    router.back();
  }

  function isOpen() {
    toast({
      title: "Copied to Clipboard",
      status: "info",
      duration: 700,
    });
  }

  return (
    <Box w="100%">
      <Box
        width="100%"
        maxW="600px"
        px={0}
        pt={2}
        pb={3}
        overflow="auto"
        minH="100vh"
        bgColor="white"
        top="0"
      >
        {/* Navigation */}
        <Box
          px={2}
          py={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <IconButton
            size={"md"}
            color="grey"
            bgColor="white"
            icon={<ArrowBackIcon />}
            aria-label={"Open Menu"}
            onClick={() => navigate()}
          />

          <Heading
            ml={3}
            sx={{
              color: "rgb(18, 29, 51",
            }}
            as="h6"
            fontWeight="600"
            fontSize="24px"
          >
            Scan or Share
          </Heading>
        </Box>

        <Divider py={1} />

        <VStack width="100%" spacing={1} pt="30px" px={2} alignItems="center" justifyContent="center">
          <Box px={2} py={0} width="100%">
            <WalletTile
              address={wallet}
              disabled={true}
              type={type}
              balance={`${balance} ALGO`}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flexStart"
            alignItems="start"
            py={3}
            px={7}
            width="100%"
          >
            <Heading
              as="h6"
              fontWeight="600"
              fontSize="18px"
              textAlign="left"
              color="rgb(9 17 34 / 97%)"
            >
              Address
            </Heading>

            <HStack
              alignItems="center"
              alignContent="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box width="70%">
                <Text fontWeight="semibold" color="gray" textAlign="left">
                  {query.address}
                </Text>
              </Box>
              <CopyToClipboard
                text={query.address}
                onCopy={() => {
                  isOpen();
                }}
              >
                <CopyIcon color="blue.500" />
              </CopyToClipboard>
            </HStack>
          </Box>
        </VStack>

        <Box display="flex" width="100%" py={4} justifyContent="center ">
          <ReactQrCode value={query.address} />
        </Box>

        <Box px={7} py={7}>
          <Button
            variant="solid"
            type="submit"
            width="full"
            height="48px"
            bg="blue.500"
            mt={4}
            loadingText="Submitting"
            colorScheme={"blue.500"}
            onClick={() => navigate()}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(ShareSection);
