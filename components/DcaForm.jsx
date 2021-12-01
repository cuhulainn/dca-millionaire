import React from "react";
import { useState, useEffect } from "react";
import {
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  Grid,
  InputLabel,
  Button,
  FormControl,
} from "@mui/material";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const DcaForm = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [coins, setCoins] = useState([]);
  const coinsUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  const [inputs, setInputs] = useState({
    frequency: "weekly",
    targetAmount: "1000000",
    dcaAmount: "100",
    coin: "btc",
    startDate: undefined,
  });

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  useEffect(() => {
    fetch(coinsUrl)
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCoins(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [coinsUrl]);

  return (
    <>
      {isLoaded ? (
        <>
          <Grid item>
            <TextField
              fullWidth
              id="dcaAmountField"
              label="Amount to DCA"
              name="dcaAmount"
              value={inputs.dcaAmount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="targetAmount"
              label="Target Amount"
              name="targetAmount"
              value={inputs.targetAmount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="frequency">Frequency</InputLabel>
              <Select
                labelId="frequency"
                id="frequency"
                name="frequency"
                label="How often to DCA?"
                value={inputs.frequency ?? "weekly"}
                onChange={handleChange}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="coin">Coin</InputLabel>
              <Select
                labelId="coin"
                id="coin"
                name="coin"
                label="Which coin?"
                value={inputs.coin ?? "btc"}
                onChange={handleChange}
              >
                {coins.map(({ id, symbol, name }) => (
                  <MenuItem key={id} value={symbol}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Starting Date"
                  id="startDate"
                  name="startDate"
                  value={inputs.startDate ?? undefined}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Calculate
            </Button>
          </Grid>
        </>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
};

export default DcaForm;
