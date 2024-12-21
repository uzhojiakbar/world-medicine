import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CardContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 20px;
  width: 100%;
`;

export const TitleText = styled.h2`
  font-size: 24px;
  font-family: "Vela Sans GX", sans-serif;
  font-weight: 600;
  color: #1e1e1e;
  margin-bottom: 20px;
`;

const CHartBar = styled.div`
  height: 300px;
  max-width: 100%;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const ChartBar = ({ admin = 0, active = 1, title }) => {
  const numsFull = {
    1: [
      1000, 2000, 3000, 4000, 5000, 8000, 9000, 10000, 7000, 6000, 4000, 3000,
    ],
    2: [
      1000, 2000, 1000, 4000, 6000, 2000, 9000, 10000, 5000, 6000, 4000, 3000,
    ],
    3: [
      1000, 2000, 8000, 4000, 10000, 2000, 9000, 5000, 5000, 7000, 4000, 3000,
    ],
    4: [
      1000, 10000, 1000, 3000, 6000, 2000, 9000, 10000, 3000, 6000, 9000, 3000,
    ],
    5: [
      1000, 2000, 8000, 4000, 10000, 2000, 9000, 5000, 5000, 7000, 4000, 3000,
    ],
    6: [
      1000, 2000, 3000, 4000, 5000, 8000, 9000, 10000, 7000, 6000, 4000, 3000,
    ],
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
        label: "Monthly Activity",
        data: nums || [],
        backgroundColor: "#6366F1",
        borderRadius: 8,
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
      <TitleText>{title}</TitleText>
      <CHartBar>
        <Bar
          style={{ maxWidth: "100%", minWidth: "100%" }}
          data={data}
          options={options}
        />
      </CHartBar>
    </CardContainer>
  );
};

export default ChartBar;
