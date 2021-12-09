import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MuiNextLink from "./MuiNextLink";
import theme from "../styles/theme";

const Navbar = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <MuiNextLink href="/">
            <Typography
              variant="h6"
              component="div"
              noLinkStyle
              sx={{ color: "text.secondary" }}
            >
              DCA Millionaire
            </Typography>
          </MuiNextLink>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
