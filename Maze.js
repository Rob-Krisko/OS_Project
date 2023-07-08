import React, { useState, useEffect } from 'react';
import styles from './Maze.module.css';

const Maze = () => {
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  // Generate a random maze using recursive backtracking
  useEffect(() => {
    const generateMaze = () => {
      const width = 20; // Width of the maze
      const height = 20; // Height of the maze

      // Initialize the maze grid with walls
      const mazeData = Array.from(Array(height), () => Array(width).fill(1));

      const backtrack = (x, y) => {
        const directions = [
          [0, -2], // Up
          [2, 0], // Right
          [0, 2], // Down
          [-2, 0], // Left
        ];

        // Randomly shuffle the directions
        for (let i = directions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        for (let [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            if (mazeData[ny][nx] === 1) {
              // Remove the wall between the current cell and the next cell
              mazeData[y + dy / 2][x + dx / 2] = 0;
              mazeData[ny][nx] = 0;

              // Recursively backtrack from the next cell
              backtrack(nx, ny);
            }
          }
        }
      };

      // Start generating the maze from the top-left corner
      backtrack(0, 0);

      // Set the generated maze
      setMaze(mazeData);
    };

    generateMaze();
  }, []);

  const handleKeyDown = (e) => {
    // Move the player based on the arrow keys
    const { key } = e;
    let { x, y } = playerPosition;

    switch (key) {
      case 'ArrowUp':
        if (maze[y - 1] && maze[y - 1][x] === 0) {
          y--;
        }
        break;
      case 'ArrowDown':
        if (maze[y + 1] && maze[y + 1][x] === 0) {
          y++;
        }
        break;
      case 'ArrowLeft':
        if (maze[y][x - 1] === 0) {
          x--;
        }
        break;
      case 'ArrowRight':
        if (maze[y][x + 1] === 0) {
          x++;
        }
        break;
      default:
        return;
    }

    setPlayerPosition({ x, y });
  };

  useEffect(() => {
    // Attach event listener for keyboard input
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Clean up event listener
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition]);

  return (
    <div className={styles.container}>
      {maze.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div
              key={x}
              className={`${styles.cell} ${cell === 1 ? '' : styles.path}`}
            >
              {x === playerPosition.x && y === playerPosition.y && (
                <div className={styles.player}>P</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
