import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CardContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 20px;
  width: 100%;
`;

const TitleText = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1e1e1e;
`;

const CHartBar = styled.div`
  height: 300px;
  min-width: 100%;
  max-width: 100%;
`;

const OxvatChart = () => {
    const [rawData, setRawData] = useState([
        { id: 2, startData: "2024-01-01", endtData: "2024-01-01", number1: 9, number2: 19 },
        { id: 1, startData: "2024-02-01", endtData: "2024-02-01", number1: 10, number2: 17 },
        { id: 3, startData: "2024-03-01", endtData: "2024-03-01", number1: 7, number2: 12 },
        { id: 4, startData: "2024-04-01", endtData: "2024-04-01", number1: 10, number2: 14 },
        { id: 5, startData: "2024-05-01", endtData: "2024-05-01", number1: 4, number2: 10 },
        { id: 6, startData: "2024-06-01", endtData: "2024-06-01", number1: 9, number2: 19 },
        { id: 6, startData: "2024-06-01", endtData: "2024-06-01", number1: 7, number2: 14 },
        { id: 6, startData: "2024-06-01", endtData: "2024-06-01", number1: 11, number2: 18 },
        { id: 6, startData: "2024-06-01", endtData: "2024-06-01", number1: 10, number2: 16 },
        { id: 6, startData: "2024-06-01", endtData: "2024-06-01", number1: 12, number2: 20 },

    ]);
    const months = rawData.map(item =>
        new Date(item.startData).toLocaleString("default", { month: "short" })
    );

    const doctors = rawData.map(item => item.number1); // **Shifokorlar soni**
    const sales = rawData.map(item => item.number2); // **Savdo soni (foiz ta’sir qilishi uchun kamaytirildi)**
    const percentages = rawData.map(item => ((item.number1 * 100) / item.number2).toFixed(0) + "%");



    // 📌 Grafik balandligi to‘g‘ri bo‘lishi uchun `displaySales` dan foydalanamiz
    const displaySales = sales.map((v, i) => v - doctors[i]);

    const data = {
        labels: months,
        datasets: [
            {
                label: "Врачи",
                data: doctors,
                backgroundColor: "#0A2A66",
                borderRadius: 4,
            },
            {
                label: "Продажи",
                data: displaySales, // 📌 Faqat grafik balandligini o‘zgartiramiz
                backgroundColor: "#A0B6F9",
                borderRadius: 4,
            },
        ],
    };

    // 📌 Custom Plugin - Malumotlarni joylashtirish
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                position: "nearest", // 📌 Normal joylashuv
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                displayColors: false,
                caretSize: 10,
                bodyFont: {
                    size: 14,
                },
                callbacks: {
                    label: function (tooltipItem) {
                        const index = tooltipItem.dataIndex;
                        if (tooltipItem.datasetIndex === 0) {
                            return `Shifokorlar: ${doctors[index]}`;
                        } else {
                            return `Savdo: ${sales[index]}`;
                        }
                    },
                },
            },
            legend: {
                position: "bottom",
                labels: {
                    font: { size: 16 },
                    color: "#333",
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 30,
                },
            },
            customLabels: true,
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: {
                    font: (context) => {
                        let width = context.chart.width;
                        return {
                            size: width > 1024 ? 16 : width > 768 ? 14 : 12,
                        };
                    },
                },
                border: { display: false },
            },
            y: {
                stacked: true,
                grid: { display: false },
                ticks: { display: false },
                border: { display: false },
            },
        },
    };

    const customLabelsPlugin = {
        id: "customLabels",
        afterDraw(chart) {
            const ctx = chart.ctx;
            const chartWidth = chart.width;

            // **Responsive shrift va o'lchamlar**
            let fontSize = chartWidth > 1024 ? 14 : chartWidth > 768 ? 12 : 10;
            let boxWidth = chartWidth > 1024 ? 50 : chartWidth > 768 ? 45 : 30;
            let boxHeight = chartWidth > 1024 ? 20 : chartWidth > 768 ? 18 : 18;
            let borderRadius = chartWidth > 1024 ? 8 : 6;

            ctx.font = `bold ${fontSize}px Arial`;

            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                meta.data.forEach((bar, index) => {
                    const barHeight = bar.height;
                    const yBottom = bar.y + barHeight - 25;
                    const yTop = bar.y + 25;
                    const yCenter = barHeight + bar.y + 2;

                    ctx.textAlign = "center";

                    if (datasetIndex === 0) {
                        // 🟦 Shifokorlar soni (pastda)
                        ctx.fillStyle = "#B5CEFB";
                        ctx.fillText(doctors[index], bar.x, yBottom + 15);
                    } else {
                        // 🟦 Savdo soni (yuqorida)
                        ctx.fillStyle = "#073790";
                        ctx.fillText(sales[index], bar.x, yTop - 10);

                        // 🔴 Foiz (o‘rtada)
                        let xCenter = bar.x - boxWidth / 2;
                        let yPosition = yCenter - boxHeight / 2;

                        // 🎨 Responsive Background va Border
                        ctx.fillStyle = "#6B9CF8";
                        ctx.beginPath();
                        ctx.roundRect(xCenter, yPosition, boxWidth, boxHeight, borderRadius);
                        ctx.fill();

                        // 🔴 Responsive Foiz matni
                        ctx.fillStyle = "#073790";
                        ctx.fillText(percentages[index], bar.x, yCenter);
                    }
                });
            });

            // **Tooltipni eng oxirida chizamiz, shunda u har doim foiz ustida chiqadi**
            if (chart.tooltip._active && chart.tooltip._active.length) {
                chart.tooltip.draw(ctx);
            }
        },
    };


    return (
        <CardContainer>
            <TitleText>Stacked Bar Chart</TitleText>
            <CHartBar>
                <Bar data={data} options={options} plugins={[customLabelsPlugin]} style={{ maxWidth: "100%", minWidth: "100%", maxHeight: "300px", minHeight: "300px" }} />
            </CHartBar>
        </CardContainer>
    );
};

export default OxvatChart;
