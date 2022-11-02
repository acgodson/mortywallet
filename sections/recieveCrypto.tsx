import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Heading,
  Divider,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import account from "algosdk/dist/types/src/account";
import { GlobalContext } from "contexts/contexts";
import { useContext } from "react";
import WalletTile from "../components/walletTile";

const RecieveCryptoSection = (props: { onToggle: () => void }) => {
  const { user, logout, balance, account, defaultRate }: any = useContext(GlobalContext);
  return (
    <Box
      width="100%"
      position="absolute"
      overflow="auto"
      minH="100vh"
      bgColor="blackAlpha.500"
      top="0"
    >
      <Box
        w="500px"
        bgColor="white"
        h="100vh"
        float="right"
        px={6}
        pt={2}
        pb={10}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Heading
            sx={{
              color: "rgb(18, 29, 51",
            }}
            as="h6"
            fontWeight="600"
            fontSize="24px"
          >
            Receive
          </Heading>

          <IconButton
            size={"md"}
            color="grey"
            borderRadius="50%"
            bgColor="whitesmoke"
            icon={<CloseIcon />}
            aria-label={"Open Menu"}
            display={["inherit", "inherit", "inherit"]}
            onClick={props.onToggle}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={8}
        >
          <Box
            fontWeight="700"
            letterSpacing={0.5}
            color="rgb(53, 63, 82)"
            opacity={0.8}
          >
            Select and share your address or QR code to recieve tokens or assets
            from anyone around the world{" "}
          </Box>

          <Box
            py={10}
            width="100%"
            flexDirection="column"
            display="flex"
            justifyContent="center"
          >
            {account ? (
              <WalletTile
                key={account}
                address={account}
                disabled={false}
                type={"Algo"}
                balance={`\$${balance * defaultRate}`}
              />
            ) : (
              <Spinner />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecieveCryptoSection;
