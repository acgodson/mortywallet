import React, { useContext, useEffect, useState, useRef, useCallback} from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { GlobalContext } from "contexts/contexts";
import CryptoChart from "components/chart";


const AssetsTrade = (props: { buy: () => void; swap: () => void }) => {
  const assetz = ["Algorand", "Mort"];
  const { user, defaultRate, defaultSymbol, historyPrices, balance }: any =
    useContext(GlobalContext);
  const [defaultCoin, setDefaultCoin] = useState("Algo");
  const assets = assetz.filter((x) => x !== defaultCoin);

  const [fetching, setFetching] = useState(true);
  const [chartInfo, setChartInfo] = useState<any | null>(null);

  useEffect(() => {   
    if (historyPrices) {
      if (historyPrices.length > 3) {
        setFetching(false);
        if (!chartInfo) {
          setChartInfo({
            options: {
              chart: {
                id: "Algo Closing Prices",
                toolbar: {
                  show: false,
                },
                sparkline: true,
              },
              xaxis: {
                categories: [6, 5, 4, 3, 2, 1],
              },
              grid: {
                show: false,
              },
            },

            series: [
              {
                name: "Closing Prices",
                data: [...historyPrices],
              },
            ],
          });
        }
      }
    }
  });

  return (
    <>
      <Box w="100%">
        {/* Trade Information */}
        <Box
          boxShadow="sm"
          bgColor="white"
          border=" solid 1.5px whitesmoke"
          borderRadius={8}
          py={4}
        >
          <Menu>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              my={3}
              alignItems="center"
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box as="img" src="algo.svg" height="30px"></Box>
                  <Box
                    as="span"
                    ml={2}
                    fontSize="22px"
                    fontWeight="500"
                    color="grey"
                  >
                    {defaultCoin}
                  </Box>
                  <MenuButton
                    _active={{
                      border: "none",
                      backgroundColor: "white",
                    }}
                    _focus={{
                      border: "none",
                      backgroundColor: "white",
                    }}
                    bgColor="white"
                    border="none"
                    fontWeight="bold"
                    fontSize="xl"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  />
                </Box>

                <Box fontSize="22px" fontWeight="bold">
                  {defaultSymbol}
                  {defaultRate}
                </Box>
                <Box fontSize="sm" fontWeight="bold" color="green.500">
                  {defaultSymbol}%
                </Box>
              </Box>
            </Box>

            {/* assetList */}
            <MenuList>
              {assets.map((x) => (
                <MenuItem
                  key={x + 0}
                  minH="48px"
                  bgColor="white"
                  w="200px"
                  onClick={() => setDefaultCoin(x)}
                >
                  <Box
                    as="img"
                    boxSize="2rem"
                    borderRadius="full"
                    src="algo.svg"
                    alt="eth"
                    mr="12px"
                  />
                  <Box as="span">{x}</Box>
                </MenuItem>
              ))}{" "}
            </MenuList>

            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                bgColor="rgb(9 17 34 / 97%)"
                _hover={{
                  backgroundColor: "rgb(12, 108, 242)",
                }}
                color="white"
                mx={1.5}
                my={1}
                fontWeight="600"
                fontSize="lg"
                onClick={props.buy}
              >
                Buy {defaultCoin}
              </Button>
              <Button
                bgColor="white"
                mx={1.5}
                my={1}
                boxShadow={1}
                border="1.5px solid rgb(9 17 34 / 97%)"
                color="rgb(9 17 34 / 97%)"
                fontWeight="600"
                fontSize="lg"
                onClick={props.swap}
              >
                Swap {defaultCoin}
              </Button>
            </Box>
          </Menu>

          {!fetching ? (
            <HStack justifyContent="center" width="100%" py={12}>
              {chartInfo && (
                <CryptoChart
                  options={chartInfo.options}
                  series={chartInfo.series}
                />
              )}
            </HStack>
          ) : (
            <HStack w="100%" justifyContent="center" py={12}>
              <Spinner />
            </HStack>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AssetsTrade;
