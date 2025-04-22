(() => {
    const DIRECTIONS = [
        { dx: 0, dy: -1 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 }
    ];

    let maze = [];
    let currentX, currentY;
    let direction = 2; // Start facing down
    let interval;

    // ✅ Expose this function globally
    window.initializeLeftWallFollower = function(mazeData) {
        maze = mazeData;

        // Start position at bottom left
        currentX = 1;
        currentY = maze.length - 2;

        direction = 2; // Facing down
        drawCurrentPosition();

        interval = setInterval(moveWallFollower, 10);
    };

    function drawCurrentPosition() {
        const prevCell = document.querySelector(`#cell-${currentY}-${currentX}`);
        if (prevCell && !prevCell.classList.contains('visited')) {
            prevCell.classList.add('visited');
        }

        document.querySelectorAll('.cell.current').forEach(cell => {
            cell.classList.remove('current');
        });

        const cell = document.querySelector(`#cell-${currentY}-${currentX}`);
        if (cell) {
            cell.classList.add('current');
        }
    }

    function moveWallFollower() {
        if (currentX === maze[0].length - 2 && currentY === 1) {
            clearInterval(interval);
            console.log('Solved!');
            return;
        }

        const leftDirection = (direction + 3) % 4;
        const leftX = currentX + DIRECTIONS[leftDirection].dx;
        const leftY = currentY + DIRECTIONS[leftDirection].dy;

        if (maze[leftY][leftX] === 0) {
            direction = leftDirection;
            currentX = leftX;
            currentY = leftY;
        } else {
            const forwardX = currentX + DIRECTIONS[direction].dx;
            const forwardY = currentY + DIRECTIONS[direction].dy;

            if (maze[forwardY][forwardX] === 0) {
                currentX = forwardX;
                currentY = forwardY;
            } else {
                direction = (direction + 1) % 4;
            }
        }

        drawCurrentPosition();
    }
})();
