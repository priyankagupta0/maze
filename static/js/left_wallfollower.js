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

    function initializeLeftWallFollower(mazeData) {
        maze = mazeData;

        // Start position at bottom left
        currentX = 1;
        currentY = maze.length - 2; //inside the walls

        direction = 2; // Facing down
        drawCurrentPosition();

        // Start moving with an interval for animation effect
        interval = setInterval(moveWallFollower, 100);
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

        // Try turning left first
        let leftDirection = (direction + 3) % 4;
        let leftX = currentX + DIRECTIONS[leftDirection].dx;
        let leftY = currentY + DIRECTIONS[leftDirection].dy;

        if (maze[leftY][leftX] === 0) {
            direction = leftDirection;
            currentX = leftX;
            currentY = leftY;
        } else {
            let forwardX = currentX + DIRECTIONS[direction].dx;
            let forwardY = currentY + DIRECTIONS[direction].dy;

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