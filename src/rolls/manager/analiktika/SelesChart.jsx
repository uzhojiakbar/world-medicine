import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CardContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 20px;
  width: 100%; /* Parent divning kengligini o'rnatish */
`;

export const TitleText = styled.h2`
  font-size: 24px;
  font-family: "Vela Sans GX", sans-serif;
  font-weight: 600;
  color: #1e1e1e;
  margin-bottom: 10px;
`;

const CHartLine = styled.div`
  height: 300px;
  width: 100%;
  max-width: 100%; /* Mobilda tashqariga chiqmasligi uchun cheklash */
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;

  font-size: 16px;
  .belgi {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #216bf4;
  }

  .belgi2 {
    background-color: red;
  }
`;

const Wrap = styled.div`
  height: 300px;
  width: 100%;
  max-width: 100%;
  padding-left: 30px;
`;

const SalesChart = ({
  admin = 0,
  active = 1,
  title,
  seles = ["Продажа", "Квота"],
}) => {
  const numsFull = {
    1: [
      31555, 56216, 11294, 15027, 12974, 64116, 18768, 46218, 15762, 66912,
      38100, 33396,
    ],
    2: [
      21184, 46946, 10282, 27202, 36034, 23612, 43236, 38045, 14781, 52533,
      25647, 10481,
    ],
    // Qolgan ma'lumotlar...
  };

  const nums = numsFull[active];

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: seles[0],
        data: nums || [],
        borderColor: admin ? "#32518b" : "#1E40AF",
        backgroundColor: "rgba(30, 64, 175, 0.1)",
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: seles[1],
        data: [
          8000, 38000, 44000, 50000, 55000, 46000, 47000, 48000, 49000, 50000,
          55000, 62000,
        ], // Qizil chiziq uchun ma'lumotlar
        borderColor: "red",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value / 1000}K`,
          color: "#6B7280",
        },
      },
      x: {
        ticks: {
          color: "#6B7280",
        },
      },
    },
  };

  return (
    <CardContainer>
      <TitleText>{title || "Статистика выполнения задач"}</TitleText>
      <IconWrapper>
        <Item>
          <div className="belgi"></div>
          <div>{seles[0]}</div>
        </Item>
        <Item>
          <div className="belgi belgi2"></div>
          <div>{seles[1]}</div>
        </Item>
      </IconWrapper>
      <Wrap>
        <CHartLine>
          <Line data={data} options={options} />
        </CHartLine>
      </Wrap>
    </CardContainer>
  );
};

export default SalesChart;
