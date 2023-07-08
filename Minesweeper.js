import React, { useState } from 'react';

function Minesweeper() {
  const numRows = 8;
  const numCols = 8;
  const numMines = 10;

  function createBoard() {
    let board = Array(numRows).fill().map(() => Array(numCols).fill({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0
    }));

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const row = Math.floor(Math.random() * numRows);
      const col = Math.floor(Math.random() * numCols);
      if (!board[row][col].isMine) {
        board[row][col].isMine = true;
        minesPlaced++;
      }
    }

    return board;
  }

  const [board, setBoard] = useState(createBoard());

  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <button key={cellIndex}>
              {cell.isRevealed ? (cell.isMine ? 'M' : cell.adjacentMines > 0 ? cell.adjacentMines : '') : cell.isFlagged ? 'F' : ''}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Minesweeper;
