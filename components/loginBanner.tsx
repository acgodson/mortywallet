import { Box } from "@chakra-ui/react";

const LoginBanner = () => {
  return (
    <>
      <Box width="100%" display={["none", "none", "block"]}>
        <Box
          as="img"
          src="/cool_cat.svg"
          alt="bgg"
          height="auto"
          maxW="350px"
          position="absolute"
          top="70px"
          right="50px"
        />

        <Box
          as="img"
          src="/tech_cat.svg"
          alt="bgg"
          height="auto"
          maxW="200px"
          position="absolute"
          top="30%"
          right="35%"
        />

        <Box
          as="img"
          src="/shop_cart.svg"
          alt="bgg"
          height="auto"
          maxW="200px"
          position="absolute"
          right="25%"
          top="70%"
        />
      </Box>
    </>
  );
};

export default LoginBanner;
