import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaHome, FaPlusCircle, FaUser } from "react-icons/fa";

const Routes = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: <FaHome fontSize="25px" />,
  },
  {
    id: 2,
    name: "Profile",
    url: "/settings",
    icon: <FaUser fontSize="25px" />,
  },
];

const Assets = [
  {
    id: 1,
    name: "Algo",
    icon: "/algo.svg",
    url: "/coins/algo",
  },
];

const SideNav = (props: { index: number; onCreateAsset: () => void }) => {
  let router = useRouter();
  function navigate(path: string) {
    router.push(path);
  }
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
            bg={i === props.index ? "blue.100" : "whiteAlpha.100"}
            color="#333"
            border="solid 1.5px whitesmoke"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            my={1}
            onClick={() => navigate(x.url)}
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
            onClick={() => navigate(x.url)}
          >
            <Box as="img" alt={x.name} src={x.icon} width="30px" />

            <Text textAlign="center" ml={4}>
              {x.name}
            </Text>
          </Button>
        ))}

        <Button
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
          onClick={props.onCreateAsset}
        >
          {/* Finish  */}

          <FaPlusCircle />

          <Text textAlign="center" ml={4}>
            Create Asset
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default SideNav;
