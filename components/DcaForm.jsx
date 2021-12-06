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
  InputAdornment,
  Container,
} from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { formatISO9075 } from "date-fns";

const DcaForm = ({ setDcaChartData, setIsChartDataLoaded }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [coins, setCoins] = useState([]);
  const baseUrl = `https://api.coingecko.com/api/v3/`;
  const coinsUrl = `${baseUrl}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  const [inputs, setInputs] = useState({
    frequency: "weekly",
    targetAmount: "1000000",
    dcaAmount: "100",
    coin: "bitcoin",
    startDate: null,
    endDate: Date.now(),
  });

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (date) => {
    setInputs((values) => ({ ...values, startDate: date }));
  };

  const setDaysBetweenBuys = (frequency) => {
    let days = 0;
    switch (frequency) {
      case "daily":
        days = 1;
        break;
      case "weekly":
        days = 7;
        break;
      case "monthly":
        days = 30.4166666667;
        break;
      default:
    }
    return days;
  };

  const calculateStartDate = (
    { frequency, targetAmount, dcaAmount },
    { prices }
  ) => {
    // based on the premise that you are investing (dcaAmount) every (frequency)
    // determine the needed starting date
    // that will result in you owning >= (targetValue) worth of (coin) today
    let count = 0;
    let coinAmount = 0;
    let usdAmount = 0;
    let todaysPrice = prices[prices.length - 1][1];
    let daysBetweenBuys = setDaysBetweenBuys(frequency);
    let chartData = [];
    for (
      let i = prices.length - 1;
      i > prices.length / daysBetweenBuys;
      i -= daysBetweenBuys
    ) {
      count++;
      const currentDate = prices[i][0];
      const currentPrice = prices[i][1];
      //accumulate amount of coin purchased on current date
      coinAmount += dcaAmount / currentPrice;
      //see if that new coin total is enough to meet target
      usdAmount = coinAmount * todaysPrice;
      chartData.push({
        date: formatISO9075(currentDate, { representation: "date" }),
        coinPrice: currentPrice,
        coinAmountPurchased: dcaAmount / currentPrice,
        coinTotal: coinAmount,
        usdTotalInvested: count * dcaAmount,
        usdTotalValue: usdAmount,
      });
      if (usdAmount >= targetAmount) {
        return { currentDate, usdAmount, chartData };
      }
    }
    return { currentDate, usdAmount, chartData };
  };

  const handleSubmit = (e) => {
    fetch(
      `${baseUrl}/coins/${inputs.coin}/market_chart?vs_currency=usd&days=max&interval=${inputs.frequency}`
    )
      .then((response) => response.json())
      .then(
        (result) => {
          const retObj = calculateStartDate(inputs, result);
          setInputs((values) => ({
            ...values,
            startDate: retObj.currentDate,
            targetAmount: retObj.usdAmount,
          }));
          setDcaChartData(retObj.chartData);
          setIsLoaded(true);
          setIsChartDataLoaded(true);
        },
        (err) => {
          setError(err);
          setIsLoaded(true);
        }
      );
    e.preventDefault();
  };

  useEffect(() => {
    fetch(coinsUrl)
      .then((response) => response.json())
      .then(
        (result) => {
          setCoins(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
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
                value={inputs.frequency}
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
                value={inputs.coin}
                onChange={handleChange}
              >
                {coins.map(({ id, symbol, name }) => (
                  <MenuItem key={id} value={id}>
                    {`${symbol.toUpperCase()}: ${name}`}
                  </MenuItem>
                ))}
              </Select>
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
          <Grid item>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Starting Date"
                  id="startDate"
                  value={inputs.startDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
};

export default DcaForm;
