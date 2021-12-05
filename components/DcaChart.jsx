import React from "react";
import { Grid } from "@mui/system";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

const DcaChart = ({ dcaChartData }) => {
  const chartData = {
    labels: dcaChartData.map((dp) => dp.date),
    datasets: [
      {
        label: "usdTotalInvested",
        data: dcaChartData.map((dp) => dp.usdTotalInvested),
      },
      {
        label: "usdTotalValue",
        data: dcaChartData.map((dp) => dp.usdTotalValue),
      },
    ],
  };

  return (
    <Grid item>
      <Chart type="line" data={chartData} />;
    </Grid>
  );
};

export default DcaChart;
