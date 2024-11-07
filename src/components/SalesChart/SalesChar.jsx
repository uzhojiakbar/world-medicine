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
  padding: 10px;
`;

const TitleText = styled.h2`
  font-size: 24px;
  font-family: "Vela Sans GX", sans-serif;
  font-weight: 600;
  color: #1e1e1e;
  margin-bottom: 20px;
`;

const CHartLine = styled.div`
  height: 300px;
`;

const SalesChart = () => {
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
        label: "Sales",
        data: [
          45151, 20000, 42000.1, 12000, 40880, 45489, 65485, 39459, 56894,
          34567, 48154, 45412,
        ],
        borderColor: "#1E40AF",
        backgroundColor: "rgba(30, 64, 175, 0.1)",
        tension: 0.1,
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
      title: {
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
          callback: (value) => `$${value / 1000}K`,
          color: "#6B7280",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#E5E7EB",
          borderDash: [5, 5],
        },
      },
      x: {
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <CardContainer>
      <TitleText>Статистика продажи препаратов</TitleText>
      <CHartLine>
        <Line data={data} options={options} />
      </CHartLine>
    </CardContainer>
  );
};

export default SalesChart;
