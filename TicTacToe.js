import React, { useState, useEffect } from 'react';
import styles from './TicTacToe.module.css';

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    useEffect(() => {
        if (!isXNext && !winner) {
            const index = findBestMove(board);
            const newBoard = [...board];
            newBoard[index] = 'O';
            setBoard(newBoard);
            setIsXNext(true);
        }
    }, [board, isXNext, winner]);

    function handleClick(index) {
        if (board[index] !== null || winner !== null) {
            return;
        }
        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);
        setIsXNext(false);
    }

    function calculateWinner(board) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if (!board.includes(null)) return 'Tie';
        return null;
    }

    function minimax(board, depth, isMaximizing) {
        const winner = calculateWinner(board);
        if (winner === 'X') return { score: -10 };
        if (winner === 'O') return { score: 10 };
        if (winner === 'Tie') return { score: 0 };

        if (isMaximizing) {
            let bestScore = -Infinity;
            let move;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    let newScore = minimax(board, depth + 1, false).score;
                    board[i] = null;
                    if (newScore > bestScore) {
                        bestScore = newScore;
                        move = i;
                    }
                }
            }
            return { score: bestScore, move: move };
        } else {
            let bestScore = Infinity;
            let move;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    let newScore = minimax(board, depth + 1, true).score;
                    board[i] = null;
                    if (newScore < bestScore) {
                        bestScore = newScore;
                        move = i;
                    }
                }
            }
            return { score: bestScore, move: move };
        }
    }

    function findBestMove(board) {
        let bestMove = minimax(board, 0, true).move;
        return bestMove;
    }

    function renderSquare(i) {
        return <button className={styles.square} onClick={() => handleClick(i)}>{board[i]}</button>;
    }

    let status;
    if (winner) {
        status = winner === 'Tie' ? 'Tie Game!' : 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (isXNext ? 'X' : 'O');
    }

    function resetBoard() {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    }

    return (
        <div>
            <div className={styles.status}>{status}</div>
            <div className={styles.boardRow}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button className={styles.resetButton} onClick={resetBoard}>Reset</button>
        </div>
    );
}

export default TicTacToe;
