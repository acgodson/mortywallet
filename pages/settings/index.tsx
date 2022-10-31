import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";

import {
  Box,
  Container,
  Text,
  Divider,
  MenuButton,
  MenuList,
  Menu,
  Button,
  MenuItem,
  Slide,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useRouter, withRouter } from "next/router";
import * as FirestoreService from "../../db/firestore";
import SettingsSection from "../../sections/securitySection";
import { GlobalContext } from "../../contexts/contexts";

const Settings = () => {
  const { user }: any = useContext(GlobalContext);

  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }

  const [userObject, setUserObject] = useState({
    country: "",
    email: "",
    imgUrl: "",
    name: "",
    phone: "",
    uid: "",
  });

  useEffect(() => {
    async function fetchUser() {
      if (!user.id) {
        return;
      }
      const UserData = await FirestoreService.getUser(user.id);
      if (UserData) {
        setUserObject(UserData);
      }
    }

    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
    <React.Fragment>
      <Head>
        <title>Morty Wallet</title>
        <meta property="og:title" content="morty wallet"></meta>
        <meta name="description" content="Buy, Sell & Swap crypto" />
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

      {user && <SettingsSection user={userObject} />}
    </React.Fragment>
  );
};

export default withRouter(Settings);
