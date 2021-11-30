import { useState } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Select,
  Grid,
  InputLabel,
  Button,
} from "@mui/material";

export default function Home() {
  const [inputs, setInputs] = useState({
    frequency: "weekly",
    targetAmount: "1000000",
    dcaAmount: "100",
    coin: "btc",
  });

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <>
      <Grid
        container
        maxWidth="xs"
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
      >
        <Typography variant="h2" color="primary" mt={6} mb={6}>
          DCA Millionaire
        </Typography>
        <Grid item>
          <TextField
            id="dcaAmountField"
            label="Amount to DCA"
            name="dcaAmount"
            value={inputs.dcaAmount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="targetAmount"
            label="Target Amount"
            name="targetAmount"
            value={inputs.targetAmount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <InputLabel id="frequency">Frequency</InputLabel>
          <Select
            labelId="frequency"
            id="frequency"
            label="How often to DCA?"
            value={inputs.frequency}
            onChange={handleChange}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <InputLabel id="coin">Coin</InputLabel>
          <Select
            labelId="coin"
            id="coin"
            label="Which coin?"
            value={inputs.coin}
            onChange={handleChange}
          >
            <MenuItem value="btc">BTC</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
