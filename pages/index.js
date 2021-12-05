import { useState, useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";
import DcaChart from "../components/DcaChart";
import DcaForm from "../components/DcaForm";

const Home = () => {
  const [dcaChartData, setDcaChartData] = useState([]);
  const [isChartDataLoaded, setIsChartDataLoaded] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column" },
          alignItems: "center",
          overflow: "hidden",
          boxShadow: 1,
          marginBottom: 3,
        }}
      >
        <Typography variant="h2" color="primary" mt={3} mb={3}>
          DCA Millionaire
        </Typography>
        <Box
          sx={{
            maxWidth: 400,
          }}
        >
          <Typography variant="body1" color="initial" pb={3}>
            Enter the amount and frequency to DCA, the target amount you want to
            be worth today, and choose a coin. The tool will calculate on what
            date you would have had to have started investing in the given coin
            in order to own the target amount&#39;s worth of your chosen coin.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} direction="column" alignContent="center">
        <DcaForm
          setDcaChartData={setDcaChartData}
          setIsChartDataLoaded={setIsChartDataLoaded}
        />
        {isChartDataLoaded ?? <DcaChart dcaChartData={dcaChartData} />}
      </Grid>
    </>
  );
};

export default Home;
