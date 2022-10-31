import { Box, Button, Divider, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";

const Routes = [
  {
    id: 1,
    name: "Home",
    url: "",
    icon: <FaHome fontSize="25px" />,
  },
  {
    id: 2,
    name: "Profile",
    url: "",
    icon: <FaUser fontSize="25px" />,
  },
];

const Assets = [
  {
    id: 1,
    name: "Algo",
    url: "/algo.svg",
  },
];

const SideNav = (props: {index: number}) => {
  return (
    <Box
      bgColor="white"
      display={["none", "none", "block"]}
      width="300px"
      h="100%"
      position="fixed"
      pt="60px"
    >
      <Box px={3} py={2} bgColor="white">
        {Routes.map((x, i) => (
          <Button
            key={x.id}
            variant="solid"
            type="submit"
            width="full"
            height="48px"
            bg={i === props.index ? "blue.100" : "whiteAlpha.100" }
            color="#333"
            border="solid 1.5px whitesmoke"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            my={1}
          >
            {x.icon}

            <Text textAlign="center" ml={4}>
              {x.name}
            </Text>
          </Button>
        ))}

        <Divider py={2} />

        <Box my={2} color="#333" fontWeight="semibold">
          Portfolio
        </Box>

        {Assets.map((x, i) => (
          <Button
            key={x.id}
            variant="solid"
            type="submit"
            width="full"
            height="48px"
            bg="whiteAlpha.100"
            color="#333"
            border="solid 1.5px whitesmoke"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            my={1}
          >
            <Box as="img" alt={x.name} src={x.url} width="30px" />

            <Text textAlign="center" ml={4}>
              {x.name}
            </Text>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SideNav;
