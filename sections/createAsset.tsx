import React, { useContext, useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { GlobalContext } from "contexts/contexts";
import {
  Box,
  IconButton,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import CustomLoading from "components/loader";
// import RPC from "../utils/algorandRPC";

const CreateAssetSection = (props: {
  onToggle: () => void;
  //   onRecieve: () => void;
}) => {
  const toast = useToast();
  const { balance, defaultRate, createAsset }: any = useContext(GlobalContext);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [unitName, setUnitName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  //let figure = balance * defaultRate;

  async function createNewAsset() {
    try {
      setSubmitting(true);

      const asset = await createAsset(name, unitName, amount);

      if (asset) {
        console.log(asset);
        setSubmitting(false);
      }
    } catch (e) {
      setSubmitting(false);
      toast({
        title: "Error",
        description: e,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      width="100%"
      position="absolute"
      overflow="hidden"
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
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading
              sx={{
                color: "rgb(18, 29, 51",
              }}
              as="h6"
              fontWeight="600"
              fontSize="24px"
            >
              Create Asset
            </Heading>

            <IconButton
              size={"md"}
              color="grey"
              borderRadius="50%"
              bgColor="whitesmoke"
              icon={<CloseIcon />}
              aria-label={"Open Menu"}
              display={["inherit", "inherit", "inherit"]}
              onClick={() => {
                props.onToggle();
              }}
            />
          </Box>

          {submitting ? (
            <CustomLoading />
          ) : (
            <Box>
              <FormControl mt={10} px={3}>
                <FormLabel color="black.200" ml={1.5} key={"name"}>
                  Name
                </FormLabel>
                <Input
                  id="name"
                  color="grey"
                  fontSize="sm"
                  type={"text"}
                  placeholder="Enter Asset name"
                  required={true}
                  readOnly={false}
                  value={name}
                  size="lg"
                  onChange={(event) => setName(event.currentTarget.value)}
                  bg="whitesmoke"
                />
              </FormControl>

              <FormControl mt={10} px={3}>
                <FormLabel color="black.200" ml={1.5} key={"unit"}>
                  Unit name
                </FormLabel>
                <Input
                  id="name"
                  color="grey"
                  fontSize="sm"
                  type={"text"}
                  placeholder="Enter Asset unit name"
                  required={true}
                  readOnly={false}
                  value={unitName}
                  size="lg"
                  onChange={(event) => setUnitName(event.currentTarget.value)}
                  bg="whitesmoke"
                />
              </FormControl>

              <FormControl mt={10} px={3}>
                <FormLabel color="black.200" ml={1.5} key={"unit"}>
                  Total issue
                </FormLabel>
                <Input
                  id="name"
                  color="grey"
                  fontSize="sm"
                  type={"text"}
                  placeholder="Enter Asset unit name"
                  required={true}
                  readOnly={false}
                  value={amount}
                  size="lg"
                  onChange={(event) =>
                    setAmount(parseInt(event.currentTarget.value))
                  }
                  bg="whitesmoke"
                />
              </FormControl>

              <Button
                variant="solid"
                type="submit"
                width="full"
                height="48px"
                bg="blue"
                mt={4}
                loadingText="Submitting"
                colorScheme={"blue.500"}
                onClick={() => createNewAsset()}
              >
                Continue
              </Button>
            </Box>
          )}
        </>
      </Box>
    </Box>
  );
};

export default CreateAssetSection;
