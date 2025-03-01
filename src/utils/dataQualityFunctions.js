// TRIM: Removes leading and trailing whitespace
export const TRIM = (text) => text.trim();

// UPPER: Converts text to uppercase
export const UPPER = (text) => text.toUpperCase();

// LOWER: Converts text to lowercase
export const LOWER = (text) => text.toLowerCase();

// REMOVE_DUPLICATES: Removes duplicate rows from a range
export const REMOVE_DUPLICATES = (rows) => {
  const uniqueRows = [];
  const seen = new Set();
  for (const row of rows) {
    const rowString = JSON.stringify(row);
    if (!seen.has(rowString)) {
      seen.add(rowString);
      uniqueRows.push(row);
    }
  }
  return uniqueRows;
};

// FIND_AND_REPLACE: Finds and replaces text in a range of cells
export const FIND_AND_REPLACE = (grid, find, replace, range) => {
  const [startCol, startRow, endCol, endRow] = range;
  const newGrid = [...grid];
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (newGrid[row][col].value.includes(find)) {
        newGrid[row][col].value = newGrid[row][col].value.replace(new RegExp(find, "g"), replace);
      }
    }
  }
  return newGrid;
};