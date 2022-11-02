import {
  Avatar,
  Box,
  Container,
  Divider,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import LoginBanner from "./loginBanner";

export const LogoHeader = () => {
  return (
    <Box
      w="100%"
      my={8}
      display="flex"
      justifyContent="center"
      borderTopLeftRadius={8}
      alignItems="center"
    >
      <Box
        as="img"
        alt="morty"
        src="/logo.png"
        mb={0}
        height="23px"
        width="23px"
      />
      <Box fontWeight="bold" fontSize="xl" ml={1.5} display="flex">
        <Text color="white">Morty </Text>
        <Text color="gray.300">Wallet</Text>
      </Box>
    </Box>
  );
};

export const LoginLayout = (props: { children: any }) => {
  return (
    <Stack
      direction={["column", "column", "row"]}
      alignItems="center"
      width="100%"
      bgColor="#121D33"
      justifyContent="space-between"
    >
      <Container
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        ml={[0, 0, 8]}
        borderRadius={3}
        bgColor="rgb(18, 29, 51)"
      >
        {props.children}
        <LoginBanner />
      </Container>
    </Stack>
  );
};

export const LoginBody = (props: { children: any }) => {
  let router = useRouter();
  const toast = useToast();
  function navigate(path: string) {
    router.push(path);
  }
  return (
    <Box
      bgColor="white"
      borderRadius={8}
      width="100%"
      maxW="600px"
      alignSelf="center"
      h={430}
      mb={8}
    >
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList px={3} pt={4} display="flex" justifyContent="center">
          <Tab>
            {" "}
            <Box
              as="img"
              alt="Teo Wen Long"
              src="/wallet-no-background.svg"
              mb={0}
            />
            <Text
              color="rgb(83, 34, 229)"
              fontWeight="bold"
              fontSize="xl"
              ml={4}
            >
              Wallet
            </Text>
          </Tab>
          <Tab>
            {" "}
            {/* <Box
              as="img"
              alt="grey wallet"
              src="/exchange-grayscale.svg"
              mb={0}
            /> */}
            <Avatar bgColor="grey" p={0} mb={0}>
              <Box as="img" src="/shop.svg" />
            </Avatar>
            <Text color="grey" fontWeight="bold" fontSize="xl" ml={2}>
              Merchant
            </Text>
          </Tab>
        </TabList>

        {props.children}
      </Tabs>

      <Divider mt={1} mb={6} />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        fontWeight="bold"
      >
        <Text fontWeight="600" color="grey">
          Don&#39;t have a Morty Account?
        </Text>

        <Box
          cursor="pointer"
          onClick={() => navigate("/signup")}
          fontSize="lg"
          mt={1}
          mb={2}
          color="blue.500"
        >
          Sign up Now
        </Box>
      </Box>
    </Box>
  );
};
