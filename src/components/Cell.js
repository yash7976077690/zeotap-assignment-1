import React from "react";
import { TextField } from "@mui/material";

const Cell = ({ value, bold, italic, color, fontSize, onChange, onFormatChange, dataType }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Data validation based on dataType
    if (dataType === "number" && isNaN(newValue)) {
      alert("Please enter a valid number.");
      return;
    }

    onChange(newValue);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      variant="outlined"
      size="small"
      fullWidth
      style={{
        fontWeight: bold ? "bold" : "normal",
        fontStyle: italic ? "italic" : "normal",
        color: color,
        fontSize: fontSize,
      }}
    />
  );
};

export default Cell;