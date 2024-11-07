import React from "react";
import SalesChart from "../SalesChart/SalesChar";
import { ChartBlockCon } from "./style";

const ChartBlock = () => {
  return (
    <ChartBlockCon>
      <SalesChart />
    </ChartBlockCon>
  );
};

export default ChartBlock;
