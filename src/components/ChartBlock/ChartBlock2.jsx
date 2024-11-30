import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js konfiguratsiyasini import qilamiz
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartBlock2 = () => {
  // Chart uchun ma'lumotlar
  const data = {
    labels: ["Tashkent", "Andijan", "Samarkand"], // Diagrammada ko'rsatiladigan nomlar
    datasets: [
      {
        data: [500, 400, 387], // Har bir hudud uchun ma'lumotlar
        backgroundColor: ["#001EB9", "#FF5B99", "#C4D9FF"], // Diagramma bo'laklarining ranglari
        hoverBackgroundColor: ["#001EB9", "#FF5B99", "#C4D9FF"], // Hover holatidagi ranglar
        borderWidth: 0, // Chegaralarning kengligi
      },
    ],
  };

  // Diagramma uchun opsiyalar
  const options = {
    cutout: "70%", // Markazdagi bo'shliqni sozlash
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} sht.`; // Tooltipdagi matn
          },
        },
      },
    },
  };

  // Umumiy miqdor (total)
  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

  return (
    <div className="chart-container">
      <div className="chart">
        <Doughnut data={data} options={options} />
        <div className="total">
          <span>Jami: </span>
          <span>{total} sht.</span>
        </div>
      </div>
      <div className="legend">
        {data.labels.map((label, index) => (
          <div className="legend-item" key={label}>
            <div
              className="color-box"
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index],
              }}
            ></div>
            {label}: {data.datasets[0].data[index]} sht.
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartBlock2;
