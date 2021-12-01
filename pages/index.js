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
import DcaForm from "../components/DcaForm";

const Home = () => {
  return (
    <>
      <Grid
        container
        // maxWidth="xs"
        spacing={2}
        direction="column"
        // justifyContent="center"
        // alignItems="center"
        alignContent="center"
        // wrap="wrap"
      >
        <Typography variant="h2" color="primary" mt={6} mb={6}>
          DCA Millionaire
        </Typography>
        <DcaForm />
      </Grid>
    </>
  );
};

export default Home;
