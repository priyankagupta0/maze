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

    window.initializeRightWallFollower = function(mazeData) {
        maze = mazeData;

        // Start position at bottom left
        currentX = 1;
        currentY = maze.length - 2; //inside the walls

        direction = 2; // Facing down
        drawCurrentPosition();

        // Start moving with an interval for animation effect
        interval = setInterval(moveWallFollower, 10);
    }

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

        // Try turning Right first
        const rightDirection = (direction + 1) % 4;
        const rightX = currentX + DIRECTIONS[rightDirection].dx;
        const rightY = currentY + DIRECTIONS[rightDirection].dy;

        if (maze[rightY][rightX] === 0) {
            direction = rightDirection;
            currentX = rightX;
            currentY = rightY;
        } else {
            const forwardX = currentX + DIRECTIONS[direction].dx;
            const forwardY = currentY + DIRECTIONS[direction].dy;

            if (maze[forwardY][forwardX] === 0) {
                currentX = forwardX;
                currentY = forwardY;
            } else {
                direction = (direction + 3) % 4;
            }
        }
        drawCurrentPosition();
    }
})();