import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
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
  width: 100%; /* Ensure charts take full width of their container */
`;

const CHartLine = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%; /* Prevent the chart from going outside of its container */
`;

const SalesChart = ({ admin = 0, active = 1 }) => {
  const numsFull = {
    1: [
      31555, 56216, 11294, 15027, 12974, 64116, 18768, 46218, 15762, 66912,
      38100, 33396,
    ],
    2: [
      21184, 46946, 10282, 27202, 36034, 23612, 43236, 38045, 14781, 52533,
      25647, 10481,
    ],
    3: [
      69714, 68237, 36625, 18479, 65735, 68701, 32130, 63549, 59675, 17483,
      58117, 68925,
    ],
    4: [
      42358, 55731, 63711, 41558, 57068, 14168, 61614, 41071, 44714, 21554,
      25791, 43728,
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
        label: "Sales",
        data: nums || [],
        borderColor: admin ? "#216bf4" : "#1E40AF",
        backgroundColor: "rgba(30, 64, 175, 0.1)",
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
      <CHartLine>
        <Line style={{ maxWidth: "100%" }} data={data} options={options} />
      </CHartLine>
    </CardContainer>
  );
};

export default SalesChart;