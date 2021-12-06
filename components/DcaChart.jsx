import React from "react";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const DcaChart = ({ dcaChartData }) => {
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
        text: "Value of Investment Over Time",
      },
    },
  };

  const chartData = {
    labels: labelData,
    datasets: [
      {
        label: "Amount Invested",
        borderColor: "blue",
        backgroundColor: "lightblue",
        data: dcaChartData.map((dp) => dp.usdTotalInvested),
      },
      {
        label: "Value of Investment",
        borderColor: "red",
        backgroundColor: "pink",
        data: dcaChartData.map((dp) => dp.usdTotalValue),
      },
    ],
  };

  return (
    <Grid item>
      <Line type="line" data={chartData} options={chartOptions} />;
    </Grid>
  );
};

export default DcaChart;
