import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import Spreadsheet from "./components/Spreadsheet";
import Toolbar from "./components/Toolbar";
import FormulaBar from "./components/FormulaBar";
import "./App.css";

const App = () => {
  return (
    <Container maxWidth="lg" className="app-container">
      <Typography variant="h4" align="center" gutterBottom>
        Google Sheets Clone
      </Typography>
      <Paper elevation={3} className="spreadsheet-paper">
        <Toolbar />
        <FormulaBar />
        <Spreadsheet />
      </Paper>
    </Container>
  );
};

export default App;