import React, { useState } from "react";
import { Paper, TextField, Button, Typography, Box } from "@mui/material";
import { SUM, AVERAGE, MAX, MIN, COUNT } from "../utils/formulaUtils";
import { TRIM, UPPER, LOWER } from "../utils/dataQualityUtils"; // Import from dataQualityUtils

const TestingPanel = () => {
  const [inputData, setInputData] = useState("");
  const [result, setResult] = useState("");

  const handleTestFunction = (func) => {
    try {
      const data = inputData.split(",").map((item) => item.trim());
      let output;

      switch (func) {
        case "SUM":
          output = SUM(data.map(Number));
          break;
        case "AVERAGE":
          output = AVERAGE(data.map(Number));
          break;
        case "MAX":
          output = MAX(data.map(Number));
          break;
        case "MIN":
          output = MIN(data.map(Number));
          break;
        case "COUNT":
          output = COUNT(data.map(Number));
          break;
        case "TRIM":
          output = data.map((item) => TRIM(item)).join(", ");
          break;
        case "UPPER":
          output = data.map((item) => UPPER(item)).join(", ");
          break;
        case "LOWER":
          output = data.map((item) => LOWER(item)).join(", ");
          break;
        default:
          output = "Invalid function";
      }

      setResult(`Result: ${output}`);
    } catch (error) {
      setResult("Error: Invalid input or function execution.");
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Testing Panel
      </Typography>
      <TextField
        label="Input Data (comma-separated)"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box style={{ marginTop: "10px" }}>
        <Button variant="contained" onClick={() => handleTestFunction("SUM")} style={{ margin: "5px" }}>
          Test SUM
        </Button>
        <Button variant="contained" onClick={() => handleTestFunction("AVERAGE")} style={{ margin: "5px" }}>
          Test AVERAGE
        </Button>
        <Button variant="contained" onClick={() => handleTestFunction("MAX")} style={{ margin: "5px" }}>
          Test MAX
        </Button>
        <Button variant="contained" onClick={() => handleTestFunction("MIN")} style={{ margin: "5px" }}>
          Test MIN
        </Button>
        <Button variant="contained" onClick={() => handleTestFunction("COUNT")} style={{ margin: "5px" }}>
          Test COUNT
        </Button>
        <Button variant="contained" onClick={() => handleTestFunction("TRIM")} style={{ margin: "5px" }}>
          Test TRIM
        </Button>
        <Button variant="contained" onClick={() => handleTestFunction("UPPER")} style={{ margin: "5px" }}>
          Test UPPER
        </Button>
        <Button variant="contained" onClick={() => handleTestFunction("LOWER")} style={{ margin: "5px" }}>
          Test LOWER
        </Button>
      </Box>
      <Typography variant="body1" style={{ marginTop: "20px" }}>
        {result}
      </Typography>
    </Paper>
  );
};

export default TestingPanel;