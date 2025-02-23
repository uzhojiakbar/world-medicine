import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

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
  padding: 0 50px;
  max-width: 100%;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const StackedBarChart = ({ data = {}, title = "" }) => {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


    const confData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Врачи",
                data: data?.doctor || [10, 12, 15, 18, 20, 16, 14, 13, 17, 19, 22, 25],
                backgroundColor: (ctx) => (ctx.active ? "#1D4ED8" : "#4C68FF"),
                borderRadius: 4,
            },
            {
                label: "Продажи",
                data: data?.sales || [30, 35, 40, 45, 50, 42, 38, 36, 41, 44, 50, 60],
                backgroundColor: (ctx) => (ctx.active ? "#edf0ff" : "#C8D3FE"),
                borderRadius: 4,
            },
        ],
    };


    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
            },

            legend: {
                position: "bottom",
                labels: {
                    responsive: true,
                    font: {
                        size: 16, // Yozuv hajmi
                    },
                    color: "#333", // Yozuv rangini o‘zgartirish
                    usePointStyle: true, // Kvadratni aylana shaklga o‘zgartirish
                    pointStyle: "circle", // Kvadrat o‘rniga doira chiqarish
                    padding: 30,
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                    drawBorder: false,
                    drawOnChartArea: false, // Grafika ichidagi chiziqlarni o‘chiradi
                    drawTicks: false, // Kichik chiziqlarni ham o‘chiradi
                },
                ticks: {
                    font: {
                        size: 12, // Oy nomlarini kattalashtirish
                    },
                    padding: 10, // Oy nomlari va bar orasidagi masofani oshirish
                },
                border: { display: false },
            },
            y: {
                stacked: true,
                grid: {
                    display: false,
                    drawBorder: false,
                    drawOnChartArea: false, // Grafika ichidagi chiziqlarni o‘chiradi
                    drawTicks: false, // Kichik chiziqlarni ham o‘chiradi
                },
                ticks: {
                    display: false, // Yonidagi raqamlarni o‘chiradi
                },
                border: { display: false },
            },
        },
    };


    return <CardContainer>
        <TitleText>{title || "Количество врачей к продажам"}</TitleText>
        <CHartBar>

            <Bar
                style={{ maxWidth: "100%", minWidth: "100%", maxHeight: "300px", minHeight: "300px" }}
                data={confData}
                options={options}
            />
        </CHartBar>
    </CardContainer>
};

export default StackedBarChart;
