import React, { useContext } from "react";
import Head from "next/head";
import { FaHome } from "react-icons/fa";
import { Box, Button, Spinner, VStack } from "@chakra-ui/react";
import { useRouter, withRouter } from "next/router";
import { GlobalContext } from "../../contexts/contexts";

const Refer = ({ router: { query } }) => {
  const param = query;
  const { user }: any = useContext(GlobalContext);

  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Morty Wallet</title>
        <meta property="og:title" content="Morty Wallet"></meta>
        <meta name="description" content="Everyday Wallet" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {!user && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          minH="100vh"
          bg="white"
        >
          <Spinner
            emptyColor="whitesmoke"
            size="xl"
            color="rgb(12, 108, 242)"
          />
        </Box>
      )}

      <VStack
        display="flex"
        justifyContent="center"
        px={3}
        flexDirection="column"
        minH="100vh"
        width="100%"
      >
        <Box px={3} textAlign="center" py={3}>
          Page not available at the moment. Please check back later after
          firebase dynamic link is set up
        </Box>
        <Button
          onClick={() => navigate("/home")}
          bgColor="rgb(9 17 34 / 97%)"
          color="white"
          fontWeight="bold"
          px={3}
        >
          <Box as="span" mr={2}>
            {/* <FaHome /> */}
            <Box
              as="img"
              alt="blockchai"
              src="/logo.png"
              mb={0}
              height="23px"
              width="23px"
            />
          </Box>
          Back to Home
        </Button>
      </VStack>
    </React.Fragment>
  );
};

export default withRouter(Refer);
