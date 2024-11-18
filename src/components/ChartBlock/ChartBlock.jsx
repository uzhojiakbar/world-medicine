import React from "react";
import SalesChart from "../SalesChart/SalesChar";
import { ChartBlockCon } from "./style";

const ChartBlock = ({ admin = 0, active }) => {
  return (
    <ChartBlockCon>
      <SalesChart admin={admin} active={active} />
    </ChartBlockCon>
  );
};

export default ChartBlock;
