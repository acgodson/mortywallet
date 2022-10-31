import React from "react";
import { Stack, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Stack
      as="footer"
      isInline
      spacing={[1, 2]}
      p={4}
      justifyContent="space-between"
      alignItems="center"
      w={["100%", "90%", "90%"]}
      maxW="container.lg"
      mx="auto"
      bgColor="rgb(18, 29, 51)"
    >
      <Flex
        flexDirection={["column", "column", "row"]}
        flexFlow={["column-reverse", "column-reverse"]}
        justifyContent={["center", "space-between"]}
        alignItems="center"
        w="100%"
      ></Flex>
    </Stack>
  );
};

export default Footer;
