import React, {useState} from "react";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend} from "chart.js";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CardContainer = styled.div`
    background-color: var(--bg-color);
    border-radius: 12px;
    padding: 20px;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 100px;
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

const OxvatChart = ({
                        data11 = [
                            {
                                "doctorsNumber": 10,
                                "doctorsWithContract": 49,
                                "month": "MARCH"
                            }
                        ], title = ""
                    }) => {


    // function transformData(data) {
    //     const monthMap = {
    //         "JANUARY": "01", "FEBRUARY": "02", "MARCH": "03", "APRIL": "04",
    //         "MAY": "05", "JUNE": "06", "JULY": "07", "AUGUST": "08",
    //         "SEPTEMBER": "09", "OCTOBER": "10", "NOVEMBER": "11", "DECEMBER": "12"
    //     };
    //
    //     if (data.length === 0) return [];
    //
    //     let year = new Date().getFullYear();
    //     let firstMonthNum = monthMap[data[0].month.toUpperCase()];
    //     let monthOrder = Object.keys(monthMap).slice(Object.keys(monthMap)?.indexOf(data[0]?.month?.toUpperCase()))?.concat(
    //         Object.keys(monthMap).slice(0, Object.keys(monthMap).indexOf(data[0]?.month?.toUpperCase()))
    //     );
    //
    //     let fullYearData = monthOrder.slice(0, 12).map((month, index) => {
    //         let monthNum = monthMap[month];
    //         return {
    //             id: index + 1,
    //             startData: `${year}-${monthNum}-01`,
    //             endtData: `${year}-${monthNum}-01`,
    //             number1: 0,
    //             number2: 0
    //         };
    //     });
    //
    //     data.forEach(item => {
    //         let monthIndex = fullYearData.findIndex(entry => entry.startData.includes(monthMap[item.month.toUpperCase()]));
    //         if (monthIndex !== -1) {
    //             fullYearData[monthIndex].number1 = item?.doctorsNumber;
    //             fullYearData[monthIndex].number2 = item?.doctorsWithContract;
    //         }
    //     });
    //
    //     return fullYearData;
    // }

    function transformData(data) {
        const monthMap = {
            "JANUARY": "01", "FEBRUARY": "02", "MARCH": "03", "APRIL": "04",
            "MAY": "05", "JUNE": "06", "JULY": "07", "AUGUST": "08",
            "SEPTEMBER": "09", "OCTOBER": "10", "NOVEMBER": "11", "DECEMBER": "12"
        };

        if (data.length === 0) return [];

        let year = new Date().getFullYear();
        let firstMonthIndex = Object.keys(monthMap).indexOf(data[0].month.toUpperCase());
        let monthOrder = Object.keys(monthMap).slice(firstMonthIndex - 11).concat(
            Object.keys(monthMap).slice(0, firstMonthIndex + 1)
        ).slice(-12);

        let fullYearData = monthOrder.map((month, index) => {
            let monthNum = monthMap[month];
            let adjustedYear = year;

            if (firstMonthIndex - 11 + index < 0) {
                adjustedYear -= 1;
            }

            return {
                id: index + 1,
                startData: `${adjustedYear}-${monthNum}-01`,
                endtData: `${adjustedYear}-${monthNum}-01`,
                number1: 0,
                number2: 0
            };
        });

        data.forEach(item => {
            let monthIndex = fullYearData.findIndex(entry => entry.startData.includes(monthMap[item.month.toUpperCase()]));
            if (monthIndex !== -1) {
                fullYearData[monthIndex].number1 = item.doctorsWithContract;
                fullYearData[monthIndex].number2 = item.doctorsNumber;
            }
        });

        return fullYearData;
    }

    const rawData = transformData(data11)



    console.log(rawData)

    const months = rawData.map(item =>
        new Date(item.startData).toLocaleString("default", {month: "short"})
    );

    const doctors = rawData.map(item => item.number2 > 0 ? item.number2 : ""); // **Shifokorlar soni**
    const sales = rawData.map(item => item.number1 > 0 ? item.number1 : ""); // **Savdo soni (foiz ta’sir qilishi uchun kamaytirildi)**
    const percentages = rawData.map(item => (((item?.number1 || 0 * 100) / item?.number2 || 0).toFixed(0)) + "%");


    // 📌 Grafik balandligi to‘g‘ri bo‘lishi uchun `displaySales` dan foydalanamiz
    const displaySales = sales.map((v, i) => v - doctors[i]);

    const data = {
        labels: months,
        datasets: [
            {
                label: "Врачи",
                data: doctors,
                backgroundColor: "#073790",
                borderRadius: 10,
            },
            {
                label: "Продажи",
                data: displaySales, // 📌 Faqat grafik balandligini o‘zgartiramiz
                backgroundColor: "#C8D3FE",
                borderRadius: 10,
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
                    font: {size: 16},
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
                grid: {display: false},
                ticks: {
                    font: (context) => {
                        let width = context.chart.width;
                        return {
                            size: width > 1024 ? 16 : width > 768 ? 14 : 12,
                        };
                    },
                },
                border: {display: false},
            },
            y: {
                stacked: true,
                grid: {display: false},
                ticks: {display: false},
                border: {display: false},
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

            ctx.font = `bold ${20}px Arial`;

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
            <TitleText>{title}</TitleText>
            <CHartBar>
                <Bar data={data} options={options} plugins={[customLabelsPlugin]}
                     style={{maxWidth: "100%", minWidth: "100%", maxHeight: "300px", minHeight: "300px"}}/>
            </CHartBar>
        </CardContainer>
    );
};

export default OxvatChart;
