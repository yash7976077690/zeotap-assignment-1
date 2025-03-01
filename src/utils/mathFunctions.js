export const SUM = (range) => range.reduce((acc, val) => acc + val, 0);

export const AVERAGE = (range) => SUM(range) / range.length;

export const MAX = (range) => Math.max(...range);

export const MIN = (range) => Math.min(...range);

export const COUNT = (range) => range.filter((val) => !isNaN(val)).length;