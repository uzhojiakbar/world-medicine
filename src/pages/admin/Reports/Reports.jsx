import React from "react";
import { ChartBlockContainer } from "./style"; // We'll define the grid styles in the style file.
import SalesChart from "../../../components/SalesChart/SalesChart";
import PieDiagram from "../../../components/PieDiagram/PieDiagream2";
import ChartBlock2 from "../../../components/ChartBlock/ChartBlock2";
import HorizontalChart from "../../../components/HorizontalBar";
import ChartBar from "../../../components/ChartBar";
import { useLanguage } from "../../../context/LanguageContext";

const Reports = () => {
  const admin = 0;
  const active = 1;

  const { translate } = useLanguage();

  return (
    <ChartBlockContainer>
      <div className="chart-item">
        <SalesChart
          title={translate("Статистика_выполнения_KPI")}
          admin={admin}
          active={active}
        />
      </div>
      <div className="chart-item">
        <PieDiagram title={translate("Пациентов_в_месяц")} />
      </div>
      <div className="chart-item">
        <HorizontalChart title={translate("Продажа_препаратов_по_регионам")} />
      </div>
      <div className="chart-item">
        <ChartBar title={translate("Активность_врачей")} active={active} />
      </div>
    </ChartBlockContainer>
  );
};

export default Reports;
