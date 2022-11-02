import { VStack, Box } from "@chakra-ui/react";

const CustomShopLoading = () => {
  return (
    <>
      <VStack h="100%" w="100%" alignItems="center" justifyContent="center">
        <Box
          as="img"
          src="/loading_shop.gif"
          alt="bgg"
          height="auto"
          width="250px"
        />
      </VStack>
    </>
  );
};

export default CustomShopLoading;
