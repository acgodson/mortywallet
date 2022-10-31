import React, { useContext, useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { useRouter, withRouter } from "next/router";
import * as FirestoreService from "../../db/firestore";
import HomeSection from "../../sections/homeSection";
import { GlobalContext } from "../../contexts/contexts";
import CustomLoading from "components/loader";

const HomePage = () => {
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
    <>
      {!user && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          minH="100vh"
          bg="white"
        >
          <CustomLoading />
        </Box>
      )}

      {user && <HomeSection user={userObject} />}
    </>
  );
};

export default withRouter(HomePage);
