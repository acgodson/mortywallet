import React, { useState } from "react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Heading,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";

const UpgradeSection = (props: { onToggle: () => void }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  return (
    <>
      <Box
        width="100%"
        position="absolute"
        overflow="auto"
        minH="100vh"
        bgColor="blackAlpha.500"
        top="0"
      >
        <Box
          w="500px"
          bgColor="white"
          h="100vh"
          float="right"
          px={6}
          pt={2}
          pb={10}
        >
          <Box
            width="100%"
            px={6}
            pt={2}
            pb={10}
            overflow="auto"
            minH="100vh"
            bgColor="white"
          >
            {pageIndex === 0 ? (
              <AboutShop onToggle={props.onToggle} />
            ) : (
              <Box bgColor="white"></Box>
            )}

            {pageIndex === 0 ? (
              <Button
                variant="solid"
                type="submit"
                width="full"
                height="48px"
                bg="blue"
                mt={4}
                loadingText="Submitting"
                colorScheme={"blue.500"}
                onClick={() => setPageIndex(1)}
              >
                Get Started
              </Button>
            ) : (
              <MarketPlace onToggle={props.onToggle} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpgradeSection;

const AboutShop = (props: { onToggle: () => void }) => {
  return (
    <>
      <Box w="100%">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box as="img" src="/blue-verified.svg" />

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

        <Heading
          my={3}
          mr={3}
          sx={{
            color: "rgb(18, 29, 51",
          }}
          as="h6"
          fontWeight="600"
          fontSize="24px"
        >
          Shop for Rewards <br />
        </Heading>

        <Text fontWeight="semibold" color="gray">
          Recieve and redeem tokens for purchasing items from different sellers
          on morty
        </Text>

        <Box overflow="auto">
          <Box
            px={6}
            mt={4}
            borderRadius={16}
            border="solid 2px whitesmoke"
            boxShadow="sm"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              my={4}
              alignItems="center"
            >
              <Box display="flex">
                <Box as="img" src="/grey-verified.svg" height="22px"></Box>
                <Box
                  as="span"
                  ml={2}
                  fontSize="17px"
                  fontWeight="600"
                  color="grey"
                >
                  Morty Tokens{" "}
                </Box>
              </Box>

              <Box
                bgColor="whitesmoke"
                fontSize="sm"
                pl={3}
                pr={3}
                height={7}
                borderRadius={8}
                fontWeight="bold"
                letterSpacing={1}
                color="grey"
              >
                Active
              </Box>
            </Box>

            <Divider my={3.5} mx={1.5} />

            <Box
              display="flex"
              justifyContent="space-between"
              my={4}
              alignItems="center"
            >
              <Box display="flex">
                <Box as="img" src="/swap-blue.svg" height="22px"></Box>
                <Box
                  as="span"
                  ml={2}
                  fontSize="17px"
                  fontWeight="600"
                  color="grey"
                  display="flex"
                  flexDirection="column"
                >
                  <Box> Swap for Crypto</Box>
                  <Box fontSize="sm" fontWeight="semibold" color="bold">
                    {" "}
                    Redeem ALGO from reward tokens
                  </Box>
                </Box>
              </Box>

              <Box>
                <CheckIcon color="blue.500" />
              </Box>
            </Box>

            <Divider my={3.5} mx={1.5} />

            <Box
              display="flex"
              justifyContent="space-between"
              my={4}
              alignItems="center"
            >
              <Box display="flex">
                <Box as="img" src="/send.svg" height="22px"></Box>
                <Box
                  as="span"
                  ml={2}
                  fontSize="17px"
                  fontWeight="600"
                  color="grey"
                  display="flex"
                  flexDirection="column"
                >
                  <Box> Share $ Recieve Morty Tokens</Box>
                  <Box fontSize="sm" fontWeight="semibold" color="bold">
                    {" "}
                    Between Morty Wallets
                  </Box>
                </Box>
              </Box>

              <Box>
                <CheckIcon color="blue.500" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const MarketPlace = (props: { onToggle: () => void }) => {
  return (
    <>
      <Box w="100%">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Box as="img" src="/blue-verified.svg" />
            <Heading
              my={3}
              mr={3}
              sx={{
                color: "rgb(18, 29, 51",
              }}
              as="h6"
              fontWeight="600"
              fontSize="24px"
            >
              Marketplace <br />
            </Heading>
          </Box>

          <Box>
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
        </Box>

        <Box overflow="auto"></Box>
      </Box>
    </>
  );
};
