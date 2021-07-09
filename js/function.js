//Function isAdjacent() qui compare si la cellulle est cote à cote
const isAdjacent = (x1, y1, x2, y2) => {
  if (x1 !== x2 && y1 !== y2) {
    return false;
  }
  return Math.abs(x1 - x2) === 1 || Math.abs(y1 - y2) === 1;
};
