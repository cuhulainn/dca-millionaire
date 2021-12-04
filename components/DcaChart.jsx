import React from "react";
import { Box } from "@mui/system";
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

const DcaChart = () => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Chart type="line" data={chartData} />;
    </Box>
  );
};

export default DcaChart;
