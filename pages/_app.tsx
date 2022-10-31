import React, { useEffect } from "react";
import "../styles/fonts.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../layouts";
import { AppProps } from "next/app";
import GlobalProvider from "../contexts/contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </GlobalProvider>
  );
}

export default MyApp;
