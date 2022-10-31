import { Box, Button, VStack } from "@chakra-ui/react";

const AlertBanner = (props: {
  title: string;
  description: string;
  pressed: () => void;
  buttonTitle: string;
}) => {
  return (
    <VStack
      w="100%"
      pt="70px"
      display="flex"
      justifyContent="center"
      borderTopLeftRadius={8}
      alignItems="center"
    >
      <Box
        bgColor="white"
        px={3}
        py={4}
        borderRadius={8}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" flexDirection={["column", "column", "column"]}>
          <Box fontSize="lg" mx={3} fontWeight="700" color="gray">
            {props.title}
          </Box>
          <Box fontSize="sm" ml={3} mr={4} fontWeight="semibold" color="gray">
            {" "}
            {props.description}
          </Box>
        </Box>
        <Box>
          <Button
            bgColor="rgb(12, 108, 242)"
            color="white"
            onClick={props.pressed}
          >
            {props.buttonTitle}
          </Button>
        </Box>
      </Box>
    </VStack>
  );
};

export default AlertBanner;
