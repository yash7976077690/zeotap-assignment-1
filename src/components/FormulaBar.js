import React from "react";
import { TextField, Paper } from "@mui/material";

const FormulaBar = () => {
  return (
    <Paper elevation={1} style={{ padding: "10px", marginBottom: "10px" }}>
      <TextField
        label="Formula"
        variant="outlined"
        fullWidth
        disabled
      />
    </Paper>
  );
};

export default FormulaBar;