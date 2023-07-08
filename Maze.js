import React, { useState } from 'react';
import styles from './Maze.module.css';

const Maze = () => {
    const maze = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 2, 1]
    ];

    const [player_pos, set_player] = useState({ x: 1, y: 1 });

    const handle_key_press = (event) => {
        const { key } = event;
        const { x, y } = player_pos;
        let new_player_pos = { x, y };

        switch (key) {
            case 'ArrowUp':
                new_player_pos = { x, y: y - 1 };
                break;
            case 'ArrowDown':
                new_player_pos = { x, y: y + 1 };
                break;
            case 'ArrowLeft':
                new_player_pos = { x: x - 1, y };
                break;
            case 'ArrowRight':
                new_player_pos = { x: x + 1, y };
                break;
            default:
                return;
        }

        if (maze[new_player_pos.y][new_player_pos.x] !== 1) {
            set_player(new_player_pos);
        }

        if (maze[new_player_pos.y][new_player_pos.x] === 2) {
            alert('You win!');
        }
    };

    return (
        <div tabIndex="0" onKeyDown={handle_key_press} className={styles.container}>
            {maze.map((row, row_index) => (
                <div key={row_index}>
                    {row.map((cell, column_index) => (
                        <div
                            key={column_index}
                            className={`${styles.cell} ${cell === 1 ? styles.wall : ''
                                } ${player_pos.x === column_index && player_pos.y === row_index ? styles.player : ''}`}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;