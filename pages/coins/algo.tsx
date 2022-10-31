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
} from "@chakra-ui/react";
import Head from "next/head";
import NavBar from "components/NavBar";
import UpgradeSection from "../../sections/upgrade";
import SendNoSection from "../../sections/sendCrypto";
import * as FirestoreService from "../../db/firestore";
import { GlobalContext } from "contexts/contexts";

const BTC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [closeUpgrade, setCloseUpgrade] = useState(true);
  const [closeSend, setCloseSend] = useState(true);
  const { user, balance, logout }: any = useContext(GlobalContext);
  const toast = useToast();
 ;

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


  const handleNoBalance = () => {
    if (balance < 10) {
      toast({
        title: "Failed",
        description: "Balance below minimum withdrawal limit",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box minH="100vh" py={3}>
        {closeUpgrade && closeSend && (
          <NavBar
            onSend={() => {
              setCloseSend(false);
            }}
            onLogOut={logout}
            index={0}
          />
        )}

        <VStack spacing={3} pt="100px" px={8} alignItems="start">
          <VStack spacing={2} alignItems="start" justifyContent="start">
            <Box display="flex" alignItems="center" justifyContent="flex-start">
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
              >
                Deposit
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
                onClick={handleNoBalance}
              >
                Transfer
              </Box>
            </HStack>
          </VStack>

          <Box
            fontWeight="700"
            letterSpacing={0.5}
            color="rgb(53, 63, 82)"
            opacity={0.8}
          >
            Algorand (ALGO) is a green crypto
          </Box>

          <Container
            boxShadow="sm"
            w="100%"
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
                ${balance}
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
              _hover={{
                backgroundColor: "rgb(10, 86, 193)",
              }}
            >
              Recieve ALGO Now
            </Box>
          </VStack>
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
    </>
  );
};

export default BTC;
