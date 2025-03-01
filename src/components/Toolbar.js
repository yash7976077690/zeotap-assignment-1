import React from "react";
import { AppBar, Toolbar as MuiToolbar, Button, ButtonGroup, IconButton } from "@mui/material";
import { FormatBold, FormatItalic, FormatSize, FormatColorText } from "@mui/icons-material";

const Toolbar = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <MuiToolbar>
        <ButtonGroup variant="contained" color="primary">
          <IconButton>
            <FormatBold />
          </IconButton>
          <IconButton>
            <FormatItalic />
          </IconButton>
          <IconButton>
            <FormatSize />
          </IconButton>
          <IconButton>
            <FormatColorText />
          </IconButton>
        </ButtonGroup>
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar;