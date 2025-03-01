export const evaluateFormula = (formula, grid) => {
    if (formula.startsWith("SUM")) {
      const range = getRange(formula, grid);
      return SUM(range);
    }
    if (formula.startsWith("AVERAGE")) {
      const range = getRange(formula, grid);
      return AVERAGE(range);
    }
    if (formula.startsWith("MAX")) {
      const range = getRange(formula, grid);
      return MAX(range);
    }
    if (formula.startsWith("MIN")) {
      const range = getRange(formula, grid);
      return MIN(range);
    }
    if (formula.startsWith("COUNT")) {
      const range = getRange(formula, grid);
      return COUNT(range);
    }
    return formula; // Default to plain text
  };
  
  // Helper function to extract range from formula (e.g., A1:A10)
  const getRange = (formula, grid) => {
    const rangeMatch = formula.match(/\(([A-Z]+\d+:[A-Z]+\d+)\)/);
    if (!rangeMatch) return [];
  
    const [start, end] = rangeMatch[1].split(":");
    const [startCol, startRow] = parseCell(start);
    const [endCol, endRow] = parseCell(end);
  
    const range = [];
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const value = Number(grid[row][col].value);
        if (!isNaN(value)) {
          range.push(value);
        }
      }
    }
    return range;
  };
  
  // Helper function to parse cell reference (e.g., A1 -> [0, 0])
  const parseCell = (cell) => {
    const col = cell.charCodeAt(0) - 65; // A -> 0, B -> 1, etc.
    const row = Number(cell.slice(1)) - 1; // 1-based to 0-based
    return [col, row];
  };
  
  // Mathematical Functions
  const SUM = (range) => range.reduce((acc, val) => acc + val, 0);
  
  const AVERAGE = (range) => (range.length > 0 ? SUM(range) / range.length : 0);
  
  const MAX = (range) => (range.length > 0 ? Math.max(...range) : 0);
  
  const MIN = (range) => (range.length > 0 ? Math.min(...range) : 0);
  
  const COUNT = (range) => range.length;