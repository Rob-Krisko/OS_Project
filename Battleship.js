import React, { useState, useEffect } from 'react';
import styles from './Battleship.module.css';

function Battleship() {
    const initialBoard = Array(10).fill().map(() => Array(10).fill('E'));
    const [playerBoard, setPlayerBoard] = useState(initialBoard);
    const [computerBoard, setComputerBoard] = useState(initialBoard);

    useEffect(() => {
        let newBoard = [...playerBoard];
        newBoard[1][1] = 'S';
        newBoard[2][1] = 'S';
        newBoard[3][1] = 'S';
        setPlayerBoard(newBoard);

        newBoard = [...computerBoard];
        newBoard[1][1] = 'S';
        newBoard[2][1] = 'S';
        newBoard[3][1] = 'S';
        setComputerBoard(newBoard);
    }, []);

    function renderBoard(board, boardType) {
        return (
          <div>
            <h2>{boardType}</h2>
            <div className={styles.board}>
              <div className={styles.row}>
                <div className={styles.cell}></div>
                {'ABCDEFGHIJ'.split('').map((letter) => (
                  <div key={letter} className={styles.cell}>
                    {letter}
                  </div>
                ))}
              </div>
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                  <div className={styles.cell}>{rowIndex}</div>
                  {row.map((cell, cellIndex) => (
                    <div key={cellIndex} className={styles.cell}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      }
    
      return (
        <div className={styles.game}>
          {renderBoard(playerBoard, 'Player')}
          {renderBoard(computerBoard, 'Computer')}
        </div>
      );
    }
    
    export default Battleship;
