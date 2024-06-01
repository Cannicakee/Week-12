function findNeighbors(node, matrix) {
    const [row, col] = node;
    const neighbors = [];
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Up
    if (row > 0) {
        neighbors.push([row - 1, col]);
    }
    // Down
    if (row < numRows - 1) {
        neighbors.push([row + 1, col]);
    }
    // Left
    if (col > 0) {
        neighbors.push([row, col - 1]);
    }
    // Right
    if (col < numCols - 1) {
        neighbors.push([row, col + 1]);
    }

    return neighbors;
}

function bfsPath(matrix, startNode, endValue) {
    const queue = [startNode];
    const visited = new Set();
    const path = [];

    visited.add(startNode.toString());  // Convert node to string to store in Set

    while (queue.length > 0) {
        const currentNode = queue.shift();
        const [currentRow, currentCol] = currentNode;
        path.push(currentNode);

        if (matrix[currentRow][currentCol] === endValue) {
            return path;
        }

        const neighbors = findNeighbors(currentNode, matrix);

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor.toString())) {
                queue.push(neighbor);
                visited.add(neighbor.toString());
            }
        }
    }

    return false;
}

/*************DO NOT MODIFY UNDER THIS LINE ***************/

module.exports = [findNeighbors, bfsPath];
