import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Heading,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";

const SendNoSection = (props: { onToggle: () => void }) => {
  return (
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
          <Box
            as="img"
            src="
      send-no-funds-promo.svg"
          ></Box>

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
            Looks like you don't have funds yet
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
            onClick={() => {}}
          >
            Recieve Crypto
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SendNoSection;
