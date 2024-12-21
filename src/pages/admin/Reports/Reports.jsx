import React from "react";
import { ChartBlockContainer } from "./style"; // We'll define the grid styles in the style file.
import SalesChart from "../../../components/SalesChart/SalesChart";
import PieDiagram from "../../../components/PieDiagram/PieDiagream2";
import ChartBlock2 from "../../../components/ChartBlock/ChartBlock2";
import HorizontalChart from "../../../components/HorizontalBar";
import ChartBar from "../../../components/ChartBar";

const Reports = () => {
  const admin = 0;
  const active = 1;
  return (
    <ChartBlockContainer>
      <div className="chart-item">
        <SalesChart
          title={"Статистика выполнения KPI"}
          admin={admin}
          active={active}
        />
      </div>
      <div className="chart-item">
        <PieDiagram title="Пациентов в месяц" />
      </div>
      <div className="chart-item">
        <HorizontalChart title="Продажа препаратов по регионам" />
      </div>
      <div className="chart-item">
        <ChartBar title={"Активность врачей"} active={active} />
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
