import React from "react";
import { ChartBlockContainer } from "./style"; // We'll define the grid styles in the style file.
import SalesChart from "../../../components/SalesChart/SalesChart";
import PieDiagram from "../../../components/PieDiagram/PieDiagream2";
import ChartBlock2 from "../../../components/ChartBlock/ChartBlock2";

const Reports = () => {
  const admin = 1;
  const active = 1;
  return (
    <ChartBlockContainer>
      <div className="chart-item">
        <SalesChart admin={admin} active={active} />
      </div>
      <div className="chart-item">
        <PieDiagram />
      </div>
      {/* <div className="chart-item">
        <ChartBlock2 admin={admin} active={active} />
      </div>
      <div className="chart-item">
        <PieDiagram />
      </div> */}
    </ChartBlockContainer>
  );
};

export default Reports;
