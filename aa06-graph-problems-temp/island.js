function getNeighbors(row, col, matrix) {
  const neighbors = [];
  const directions = [
    [-1, 0], // top
    [1, 0],  // bottom
    [0, -1], // left
    [0, 1]   // right
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (
      newRow >= 0 && newRow < matrix.length &&
      newCol >= 0 && newCol < matrix[0].length &&
      matrix[newRow][newCol] === 1
    ) {
      neighbors.push([newRow, newCol]);
    }
  }

  return neighbors;
}

function islandSize(row, col, matrix) {
  if (matrix[row][col] === 0) return 0;

  const visited = new Set();
  const stack = [[row, col]];
  visited.add(`${row},${col}`);
  let size = 0;

  while (stack.length > 0) {
    const [currentRow, currentCol] = stack.pop();
    size++;

    for (const [neighborRow, neighborCol] of getNeighbors(currentRow, currentCol, matrix)) {
      const neighborKey = `${neighborRow},${neighborCol}`;
      if (!visited.has(neighborKey)) {
        visited.add(neighborKey);
        stack.push([neighborRow, neighborCol]);
      }
    }
  }

  return size;
}

module.exports = [getNeighbors, islandSize];
