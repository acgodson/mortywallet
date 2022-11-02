/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import {
  Flex,
  IconButton,
  HStack,
  Box,
  Button,
  Stack,
  Text,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { HamburgerIcon, CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { GlobalContext } from "contexts/contexts";

const NavBar = (props: {
  onSend: () => void;
  onRecieve: () => void;
  onShop: () => void;
  onLogOut: () => {};
  index: number;
}) => {
  const { user, logout }: any = useContext(GlobalContext);
  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const MenuItems = [
    {
      name: "Home",
      url: "home",
      id: 1,
    },

    {
      name: "Profile",
      url: "settings",
      id: 2,
    },
    {
      name: "Portfolio",
      url: "earn",
      id: 3,
    },
  ];

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        px={2}
        py={1}
        boxShadow={"lg"}
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: ["column", "row"],
          justifyContent: "space-between",
          top: 0,
          width: "100%",
          zIndex: 9999999,
        }}
      >
        <Flex
          h={12}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={["97%", "95%", "95%"]}
          maxW={"container.lg"}
          mx="auto"
        >
          <Box display="flex" alignItems="center">
            <Link href="/">
              <Box
                as="img"
                alt="blockchai"
                src="/logo.png"
                mb={0}
                height="23px"
                width="23px"
              />
            </Link>
            {user && (
              <>
                <Text ml={2} fontWeight="semibold">
                  {user.email}
                </Text>
                <Button h="33px" ml={3} onClick={logout}>
                  Log out
                </Button>
              </>
            )}
          </Box>

          <HStack spacing={3} pl={2}>
            <Button
              h={8}
              bgColor="white"
              py={0}
              pl={4}
              pr={4}
              color="blue"
              border="solid 1px whitesmoke"
              disabled={false}
              fontWeight="bold"
              onClick={props.onSend}
            >
              Send
            </Button>
            <Button
              h={8}
              bgColor="white"
              py={0}
              pl={2}
              pr={2}
              color="blue"
              border="solid 1px whitesmoke"
              disabled={false}
              fontWeight="bold"
              onClick={props.onRecieve}
              // onClick={() => navigate("/recieve")}
            >
              Recieve
            </Button>

            <Button
              h="32px"
              bgImage="radial-gradient(at right bottom, rgb(33, 202, 224) 0%, rgb(89, 95, 238) 80%)"
              color="white"
              width="88px"
              py={0}
              onClick={props.onShop}
              disabled={false}
              fontWeight="bold"
            >
              <Box as="span">
                <Box
                  as="img"
                  alt="shop"
                  src="/shop.svg"
              
                  height="40px"
                />
              </Box>
              Shop
            </Button>
          </HStack>

          <IconButton
            size={"md"}
            color="blue"
            bgColor="white"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={["inherit", "none", "none"]}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen && (
          <Box
            h="100vh"
            w={["100%", "100%", "100%"]}
            maxW={"container.lg"}
            display={["flex", "flex", "none"]}
            justifyContent="start"
            alignItems="center"
            flexDirection="column"
            pt="20px"
            pb="40px"
          >
            {MenuItems.map((x, index) => (
              <Link
                key={x.id}
                href={{
                  pathname: `/${x.url}`,
                  // query: x.url ,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                  bgColor={index == props.index ? "blue.50" : "transparent"}
                  px={2}
                  my={3}
                  h="49px"
                >
                  <Text variant="h6" fontWeight="semibold">
                    {x.name}
                  </Text>
                  {index == props.index && (
                    <IconButton
                      size={"md"}
                      color="blue"
                      bgColor="transparent"
                      icon={<CheckCircleIcon />}
                      aria-label={"home"}
                      display={["inherit", "inherit", "none"]}
                      onClick={null}
                    />
                  )}
                </Box>
              </Link>
            ))}

            <Box
              as="button"
              color="red.500"
              fontSize="lg"
              fontWeight="700"
              onClick={props.onLogOut}
            >
              Sign out
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default NavBar;
