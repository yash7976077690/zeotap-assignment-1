import React, { useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import Cell from "./Cell";
import { evaluateFormula } from "../utils/formulaUtils";
import { TRIM, UPPER, LOWER, REMOVE_DUPLICATES, FIND_AND_REPLACE } from "../utils/dataQualityUtils";

const initialRows = 20;
const initialCols = 10;

const Spreadsheet = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: initialRows }, () =>
      Array.from({ length: initialCols }, () => ({ value: "", formula: "", bold: false, italic: false, color: "#000000", fontSize: 14, dataType: "text" }))
    )
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  const handleCellChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col].value = value;

    // Evaluate formulas
    if (value.startsWith("=")) {
      try {
        const result = evaluateFormula(value.slice(1), newGrid);
        newGrid[row][col].value = result;
      } catch (error) {
        newGrid[row][col].value = "ERROR";
      }
    }

    setGrid(newGrid);
  };

  const handleFormatChange = (row, col, format) => {
    const newGrid = [...grid];
    newGrid[row][col] = { ...newGrid[row][col], ...format };
    setGrid(newGrid);
  };

  const handleDataTypeChange = (row, col, dataType) => {
    const newGrid = [...grid];
    newGrid[row][col].dataType = dataType;

    // Clear cell value if data type changes
    if (dataType === "number" && isNaN(newGrid[row][col].value)) {
      newGrid[row][col].value = "";
    }

    setGrid(newGrid);
  };

  const addRow = () => {
    setGrid([...grid, Array.from({ length: initialCols }, () => ({ value: "", formula: "", bold: false, italic: false, color: "#000000", fontSize: 14, dataType: "text" }))]);
  };

  const deleteRow = (rowIndex) => {
    const newGrid = grid.filter((_, index) => index !== rowIndex);
    setGrid(newGrid);
  };

  const addColumn = () => {
    setGrid(grid.map((row) => [...row, { value: "", formula: "", bold: false, italic: false, color: "#000000", fontSize: 14, dataType: "text" }]));
  };

  const deleteColumn = (colIndex) => {
    const newGrid = grid.map((row) => row.filter((_, index) => index !== colIndex));
    setGrid(newGrid);
  };

  const applyDataQualityFunction = (type) => {
    switch (type) {
      case "TRIM":
        setGrid(grid.map((row) => row.map((cell) => ({ ...cell, value: TRIM(cell.value) }))));
        break;
      case "UPPER":
        setGrid(grid.map((row) => row.map((cell) => ({ ...cell, value: UPPER(cell.value) }))));
        break;
      case "LOWER":
        setGrid(grid.map((row) => row.map((cell) => ({ ...cell, value: LOWER(cell.value) }))));
        break;
      case "REMOVE_DUPLICATES":
        setGrid(REMOVE_DUPLICATES(grid));
        break;
      case "FIND_AND_REPLACE":
        setDialogType("FIND_AND_REPLACE");
        setOpenDialog(true);
        break;
      default:
        break;
    }
  };

  const handleFindAndReplace = () => {
    const newGrid = FIND_AND_REPLACE(grid, findText, replaceText, [0, 0, initialCols - 1, initialRows - 1]);
    setGrid(newGrid);
    setOpenDialog(false);
  };

  return (
    <TableContainer component={Paper} className="spreadsheet-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "50px" }}>
              <IconButton onClick={addRow} size="small">
                <Add />
              </IconButton>
            </TableCell>
            {grid[0].map((_, colIndex) => (
              <TableCell key={colIndex} align="center" style={{ width: "100px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {String.fromCharCode(65 + colIndex)}
                  <IconButton onClick={() => deleteColumn(colIndex)} size="small">
                    <Delete />
                  </IconButton>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {grid.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {rowIndex + 1}
                  <IconButton onClick={() => deleteRow(rowIndex)} size="small">
                    <Delete />
                  </IconButton>
                </div>
              </TableCell>
              {row.map((cell, colIndex) => (
                <TableCell key={colIndex} align="center">
                  <Cell
                    value={cell.value}
                    bold={cell.bold}
                    italic={cell.italic}
                    color={cell.color}
                    fontSize={cell.fontSize}
                    dataType={cell.dataType}
                    onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
                    onFormatChange={(format) => handleFormatChange(rowIndex, colIndex, format)}
                  />
                  <Select
                    value={cell.dataType}
                    onChange={(e) => handleDataTypeChange(rowIndex, colIndex, e.target.value)}
                    size="small"
                    style={{ marginTop: "5px" }}
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                  </Select>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" onClick={() => applyDataQualityFunction("TRIM")}>TRIM</Button>
        <Button variant="contained" onClick={() => applyDataQualityFunction("UPPER")}>UPPER</Button>
        <Button variant="contained" onClick={() => applyDataQualityFunction("LOWER")}>LOWER</Button>
        <Button variant="contained" onClick={() => applyDataQualityFunction("REMOVE_DUPLICATES")}>REMOVE DUPLICATES</Button>
        <Button variant="contained" onClick={() => applyDataQualityFunction("FIND_AND_REPLACE")}>FIND AND REPLACE</Button>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Find and Replace</DialogTitle>
        <DialogContent>
          <TextField
            label="Find"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Replace"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleFindAndReplace}>Replace</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default Spreadsheet;