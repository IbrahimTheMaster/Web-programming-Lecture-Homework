import { useState } from "react";

const empty = () => Array(9).fill(null);

function calculateWinner(squares) {
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
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {
  const [squares, setSquares] = useState(empty);
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const full = squares.every(Boolean);
  const status = winner
    ? "Winner: " + winner
    : full
      ? "Draw"
      : "Next: " + (xIsNext ? "X" : "O");

  function handleClick(i) {
    if (winner || squares[i]) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(empty());
    setXIsNext(true);
  }

  return (
    <div className="spa-mini">
      <p className="spa-mini__title">Tic-tac-toe</p>
      <p>{status}</p>
      <div className="ttt-grid" role="grid">
        {squares.map((v, i) => (
          <button
            key={i}
            type="button"
            className="ttt-cell"
            onClick={() => handleClick(i)}
          >
            {v || ""}
          </button>
        ))}
      </div>
      <button type="button" onClick={reset}>
        New game
      </button>
    </div>
  );
}
