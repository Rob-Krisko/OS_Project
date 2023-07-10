import React, { useState } from 'react';
import styles from './Battleship.module.css';

function Battleship() {
  const emptyBoard = Array(10).fill().map(() => Array(10).fill('E'));  // 'E' for empty
  const [playerBoard, setPlayerBoard] = useState(placeShips());
  const [computerBoard, setComputerBoard] = useState(placeShips());  
  const [computerShips, setComputerShips] = useState(initialShips());

  function initialShips() {
    return [
      { id: 1, size: 1, hits: 0 },
      { id: 2, size: 1, hits: 0 },
      { id: 3, size: 1, hits: 0 },
      { id: 4, size: 2, hits: 0 },
      { id: 5, size: 2, hits: 0 },
      { id: 6, size: 3, hits: 0 }
    ];
  }

  function placeShips() {
    const shipSizes = [1, 1, 1, 2, 2, 3]; // array to represent ship sizes
    const totalShipSize = shipSizes.reduce((a, b) => a + b, 0); // sum of all ship sizes

    let shipCells = 0; // count of cells labeled as 'S' for ship
    let board = Array(10).fill().map(() => Array(10).fill('E'));  // 'E' for empty

    for (let shipId = 1; shipId <= shipSizes.length; shipId++) {
        let placed = false;
        let ship = shipSizes[shipId - 1];

        while (!placed) {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            const orientation = Math.random() < 0.5 ? 'H' : 'V'; // random orientation

            let potentialPlacement = [];

            if (orientation === 'H') {
                if (col + ship <= 10) { // ensure ship doesn't go off board
                    for (let i = 0; i < ship; i++) {
                        potentialPlacement.push([row, col + i]);
                    }
                }
            } else {
                if (row + ship <= 10) { // ensure ship doesn't go off board
                    for (let i = 0; i < ship; i++) {
                        potentialPlacement.push([row + i, col]);
                    }
                }
            }

            if (potentialPlacement.every(([r, c]) => board[r][c] === 'E')) { // if all cells are empty
                potentialPlacement.forEach(([r, c]) => board[r][c] = shipId); // place ship using shipId instead of 'S'
                placed = true;
                shipCells += ship;
            }
        }
    }

    // If not all ships are placed, run the function again
    if (shipCells !== totalShipSize) {
        return placeShips();
    }

    return board;
}

  

  function makeMove(row, col) {
    if (typeof computerBoard[row][col] === 'number') {
      const hitShipId = computerBoard[row][col];
      computerBoard[row][col] = 'H';  // 'H' for hit

      // Update number of hits for the hit ship
      const hitShip = computerShips.find(ship => ship.id === hitShipId);
      if (hitShip) {
        hitShip.hits++;
        setComputerShips([...computerShips]);
      }
    } else if (computerBoard[row][col] === 'E') {
      computerBoard[row][col] = 'M';  // 'M' for miss
    }
    setComputerBoard([...computerBoard]);  // Spread operator is used to trigger a re-render
  }

  function renderCell(row, col, board, isPlayerBoard) {
    let cellStyle = {};

    if (board[row][col] === 'E') {
      cellStyle.backgroundColor = '#ADD8E6';
    } else if (typeof board[row][col] === 'number') {
      cellStyle.backgroundColor = isPlayerBoard ? '#808080' : '#ADD8E6';
    } else if (board[row][col] === 'M') {
      cellStyle.backgroundColor = '#FFFFFF';
    } else if (board[row][col] === 'H') {
      cellStyle.backgroundColor = '#FF0000';
    }

    return (
      <div className={styles.cell} style={cellStyle} onClick={isPlayerBoard ? undefined : () => makeMove(row, col)}>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Computer</h2>
        <div className={styles.board}>
          {computerBoard.map((row, rowIndex) =>
            <div className={styles.row} key={rowIndex}>
              {row.map((_, colIndex) => renderCell(rowIndex, colIndex, computerBoard, false))}
            </div>
          )}
        </div>
      </div>
  
      <div className={styles.tracker}>
        <h2>Enemy Ships</h2>
        {computerShips.map((ship, index) => (
          <div key={index}>
            Ship size: {ship.size}, Hits: {ship.hits}
          </div>
        ))}
      </div>
  
      <div>
        <h2>Player</h2>
        <div className={styles.board}>
          {playerBoard.map((row, rowIndex) =>
            <div className={styles.row} key={rowIndex}>
              {row.map((_, colIndex) => renderCell(rowIndex, colIndex, playerBoard, true))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  }
  
  export default Battleship;
  

