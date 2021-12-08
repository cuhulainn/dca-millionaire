import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = ({ dcaChartData }) => {
  let labelData = [...dcaChartData].reverse().map((dp) => dp.date);

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "x",
      intersect: false,
      position: "nearest",
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Performance of Investment Over Time",
      },
    },
  };

  const chartData = {
    labels: labelData,
    datasets: [
      {
        label: "% Return on Investment",
        borderColor: "blue",
        backgroundColor: "lightblue",
        data: dcaChartData.map(
          (dp) =>
            ((dp.usdTotalValue - dp.usdTotalInvested) / dp.usdTotalInvested) *
            100
        ),
      },
    ],
  };

  return <Bar type="bar" data={chartData} options={chartOptions} />;
};

export default PerformanceChart;
