import { Stack, Container, Box, Text } from "@chakra-ui/react";
import LoginBanner from "./loginBanner";

export const SignupLayout = (props: { children: any }) => {
  return (
    <Stack
      direction={["column", "column", "row"]}
      alignItems="center"
      width="100%"
      bgColor="#121D33"
      justifyContent="space-between"
    >
      <Container
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        ml={[0, 0, 8]}
        borderRadius={3}
        bgColor="rgb(18, 29, 51)"
      >
        {props.children}

        <Box width="100%" display={["none", "none", "block"]}>
          <Box>
            <Text>Welcome to New Money</Text>
          </Box>
        </Box>
      </Container>
    </Stack>
  );
};
