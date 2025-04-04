import random

DIRECTIONS = [(0, -1), (0, 1), (-1, 0), (1, 0)]

def generate_maze(width, height):
    if width % 2 == 0:
        width += 1
    if height % 2 == 0:
        height += 1
    
    # Create a grid full of walls
    maze = [[1 for _ in range(width)] for _ in range(height)]
    
    # Start at (1, 1) for generation
    stack = [(1, 1)]
    maze[1][1] = 0
    
    while stack:
        x, y = stack[-1]
        neighbors = []

        for dx, dy in DIRECTIONS:
            nx, ny = x + dx * 2, y + dy * 2
            if 0 < nx < width - 1 and 0 < ny < height - 1 and maze[ny][nx] == 1:
                neighbors.append((nx, ny))

        if neighbors:
            nx, ny = random.choice(neighbors)
            maze[y + (ny - y) // 2][x + (nx - x) // 2] = 0
            maze[ny][nx] = 0
            stack.append((nx, ny))
        else:
            stack.pop()
    
    # Ensure bottom-left is the start and top-right is the end
    maze[height - 2][1] = 0   # Start point
    maze[1][width - 2] = 0    # End point
    
    return maze
