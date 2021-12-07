import { Typography, Grid, Box, Button } from "@mui/material";
import MuiNextLink from "../components/MuiNextLink";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column" },
          alignItems: "center",
          overflow: "hidden",
          marginBottom: 3,
        }}
      >
        <Typography variant="h3" color="primary" mt={3} mb={3}>
          DCA Millionaire
        </Typography>
        <Box
          sx={{
            maxWidth: 375,
          }}
        >
          <Typography variant="body1" color="initial" pb={3}>
            This site provides a calculator for the &quot;Dollar Cost
            Averaging&quot; strategy. <br /> You choose how to invest:
            <ul>
              <li>buy $100 of BTC every week?</li>
              <li>buy $1000 of ETH every month?</li>
              <li>buy $20 of DOGE every day?</li>
            </ul>
            and the calculator will tell you when you would have needed to start
            this strategy in order to be worth $1M today (or other target amount
            of your choice)!
          </Typography>
          <MuiNextLink href={"/dateCalculator"}>
            <Button fullWidth variant="contained" color="primary">
              Get Started
            </Button>
          </MuiNextLink>
        </Box>
      </Box>
    </>
  );
};

export default Home;

//Enter the amount and frequency to DCA, the target amount you want to
// be worth today, and choose a coin. The tool will calculate on what
// date you would have had to have started investing in the given coin
// in order to own the target amount&#39;s worth of your chosen coin.
