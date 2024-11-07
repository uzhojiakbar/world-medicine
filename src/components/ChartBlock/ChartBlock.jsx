import React from "react";
import SalesChart from "../SalesChart/SalesChar";
import { ChartBlockCon } from "./style";

const ChartBlock = ({ active }) => {
  return (
    <ChartBlockCon>
      <SalesChart active={active} />
    </ChartBlockCon>
  );
};

export default ChartBlock;
