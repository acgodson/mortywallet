import React, { Component, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box, HStack, Spinner } from "@chakra-ui/react";
import { GlobalContext } from "contexts/contexts";

const Chart = dynamic(
  () => {
    return import("react-apexcharts");
  },
  { ssr: false }
);

const CryptoChart = (props: { options: any; series: any }) => {
  return (
    <>
      <Chart
        options={props.options}
        series={props.series}
        type="area"
        heigth="300"
      />
    </>
  );
};

export default CryptoChart;
