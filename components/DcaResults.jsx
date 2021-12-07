import React from "react";
import DcaChart from "./DcaChart";
import { Typography, Box, Grid } from "@mui/material";
import { formatISO9075 } from "date-fns";

const DcaResults = ({
  startDate,
  totalUsdAmount,
  dcaChartData,
  dcaAmount,
  frequency,
  targetAmount,
  coin,
}) => {
  return (
    <Grid container spacing={2} direction="column" alignItems="center" mt={3}>
      <Grid item>
        <Box
          sx={{
            maxWidth: 375,
          }}
        >
          <Typography variant="body1" color="initial">
            In order to be worth $ {targetAmount}, travel back in time to{" "}
            {formatISO9075(startDate)}, and buy $ {dcaAmount} worth of {coin}{" "}
            {frequency}. <br />
            Do that, and you&apos;ll be worth $ {totalUsdAmount} when you come
            back to today! <br />
            Here&apos;s how it would look:
          </Typography>
        </Box>
      </Grid>

      <DcaChart dcaChartData={dcaChartData} />
    </Grid>
  );
};

export default DcaResults;
