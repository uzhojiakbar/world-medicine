// PieDiagram.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Container,
  TotalText,
  LegendContainer,
  LegendItem,
  ColorBox,
  PieContainer,
  PieDiagramCon,
} from "./style";
import { TitleText } from "../SalesChart/SalesChar";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Ташкент", "Андижан", "Самарканд"],
  datasets: [
    {
      data: [500, 400, 387],
      backgroundColor: ["#001EB9", "#FF5B99", "#C4D9FF"],
      hoverBackgroundColor: ["#001EB9", "#FF5B99", "#C4D9FF"],
      borderWidth: 0,
    },
  ],
};

const options = {
  cutout: "70%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw} шт.`;
        },
      },
    },
  },
};

const PieDiagram = () => {
  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

  return (
    <PieContainer>
      <Container>
        <TitleText>Регионы по популярности</TitleText>

        <div className="main">
          <div className="pie-main">
            <PieDiagramCon data={data} options={options} />
            <TotalText>
              <span>В общем </span> <span className="count">{total} шт.</span>
            </TotalText>
          </div>

          <LegendContainer>
            {data.labels.map((label, index) => (
              <LegendItem key={label}>
                <ColorBox color={data.datasets[0].backgroundColor[index]} />
                {label} {data.datasets[0].data[index]} шт.
              </LegendItem>
            ))}
          </LegendContainer>
        </div>
      </Container>
    </PieContainer>
  );
};

export default PieDiagram;
