// Get the canvas and context
const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

// Get slider elements
const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");

// Default cell size
let cellSize = parseInt(sizeSlider.value);

// Calculate rows & cols based on window size
let cols, rows;
function updateGridSize() {
    cols = Math.floor((window.innerWidth * 0.9) / cellSize); // 90% of the width
    rows = Math.floor((window.innerHeight * 0.9) / cellSize); // 90% of the height
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
}

// Directions for movement
const directions = [
    { x: 0, y: -2 }, // Up
    { x: 0, y: 2 },  // Down
    { x: -2, y: 0 }, // Left
    { x: 2, y: 0 }   // Right
];

// Maze grid
let grid = [];
let stack = [];

// Cell class
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = false;
    }

    draw(color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    }
}

// Create the maze grid
function createGrid() {
    grid = [];
    for (let y = 0; y < rows; y++) {
        let row = [];
        for (let x = 0; x < cols; x++) {
            row.push(new Cell(x, y));
        }
        grid.push(row);
    }
}

// Get unvisited neighbors
function getNeighbours(cell) {
    let neighbours = [];
    for (let dir of directions) {
        let nx = cell.x + dir.x;
        let ny = cell.y + dir.y;
        if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && !grid[ny][nx].visited) {
            neighbours.push(grid[ny][nx]);
        }
    }
    return neighbours;
}

// Generate the maze using Recursive Backtracking
function generateMaze() {
    let start = grid[0][0]; // Start position
    start.visited = true;
    stack.push(start);

    function step() {
        if (stack.length > 0) {
            let current = stack[stack.length - 1];
            current.draw("white");

            let neighbours = getNeighbours(current);
            if (neighbours.length > 0) {
                let next = neighbours[Math.floor(Math.random() * neighbours.length)];

                // Remove the wall between current and next
                let wallX = (current.x + next.x) / 2;
                let wallY = (current.y + next.y) / 2;
                grid[wallY][wallX].visited = true;
                grid[wallY][wallX].draw("white");

                next.visited = true;
                stack.push(next);
            } else {
                stack.pop();
            }

            requestAnimationFrame(step); // Animate the generation process
        } else {
            highlightStartEnd(); // Ensure start and end are visible
        }
    }

    step();
}

// Highlight Start and End points
function highlightStartEnd() {
    let start = grid[0][0];
    let end = grid[rows - 1][cols - 1];

    start.draw("green"); // Start (top-left) in green
    end.draw("red"); // End (bottom-right) in red
}

// Initialize and run
function init() {
    updateGridSize();
    createGrid();

    // Fill the canvas with walls (black background)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    generateMaze();
}

// Resize event to adjust maze when window resizes
window.addEventListener("resize", () => {
    init();
});

// Slider event to adjust cell size and regenerate maze
sizeSlider.addEventListener("input", () => {
    cellSize = parseInt(sizeSlider.value);
    sizeValue.textContent = cellSize;
    init();
});

// Run the maze
init();
