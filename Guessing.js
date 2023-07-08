import React, { useState, useEffect } from 'react';

function GuessingGame() {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100.');

  useEffect(() => {
    checkGuess(guess);
  }, [guess]);

  function checkGuess(guess) {
    const num = parseInt(guess, 10);
    if (isNaN(num)) {
      setMessage('Please enter a valid number.');
      return;
    }
    if (num < targetNumber) {
      setMessage('Too low! Try a higher number.');
    } else if (num > targetNumber) {
      setMessage('Too high! Try a lower number.');
    } else {
      setMessage('Correct! Click reset to play again.');
    }
  }

  function resetGame() {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100.');
  }

  return (
    <div>
      <input type="text" value={guess} onChange={e => setGuess(e.target.value)} />
      <button onClick={() => checkGuess(guess)}>Check Guess</button>
      <button onClick={resetGame}>Reset</button>
      <p>{message}</p>
    </div>
  );
}

export default GuessingGame;
