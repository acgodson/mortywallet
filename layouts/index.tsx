import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";

const NavBar = dynamic(
  () => {
    return import("../components/NavBar");
  },
  { ssr: false }
);

function Layout({ children }) {
  return (
    <>
      <React.Fragment>
        <Head>
          <title>Morty Wallet</title>
          <meta property="og:title" content="mortywallet"></meta>
          <meta name="description" content="Buy and Sell with Algo" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <main
          style={{
            marginTop: "0px",
          }}
        >
          {children}
        </main>
      </React.Fragment>
    </>
  );
}

export default Layout;
