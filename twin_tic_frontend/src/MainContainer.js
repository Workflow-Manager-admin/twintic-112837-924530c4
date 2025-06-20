import React, { useState } from "react";

/*
  TwinTic Main Container (Dark Theme)
  Features:
    - Responsive, centered Tic Tac Toe board
    - Score display (Player X / Player O)
    - Uses dark theme color palette for backgrounds, text, and accents
    - Real-time game state update (local state)
*/

// Dark theme color variables
const COLORS = {
  primary: "#90caf9",       // Soft blue for primary actions (accent)
  secondary: "#faff00",     // Yellow accent for contrast
  accent: "#ff7d4c",        // Vibrant orange for status/accent
  bg: "#181B24",            // Main dark background
  bgSecondary: "#232635",   // Card/board background darker
  board: "#222432",         // Board cell background
  border: "#35394c",        // Subtle border for separation
  x: "#8ee16c",             // X player (green-cyan for dark bg)
  o: "#90caf9",             // O player (soft blue)
  text: "#f5f7fc",          // Primary text
  textSecondary: "#b0b8c1", // Muted text color
};

function getInitialBoard() {
  return Array(9).fill(null);
}

// PUBLIC_INTERFACE
export default function MainContainer() {
  // State: Board, player turn, game status, scores
  const [board, setBoard] = useState(getInitialBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  function calculateWinner(b) {
    const lines = [
      [0, 1, 2],[3, 4, 5],[6, 7, 8], // rows
      [0, 3, 6],[1, 4, 7],[2, 5, 8], // cols
      [0, 4, 8],[2, 4, 6]            // diags
    ];
    for (let line of lines) {
      const [a, bIdx, c] = line;
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        return b[a];
      }
    }
    return b.every(cell => cell) ? "draw" : null;
  }
  
  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || winner) return; // Ignore if filled/won

    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win === "X" || win === "O") {
      setWinner(win);
      setScores(s => ({ ...s, [win]: s[win] + 1 }));
    } else if (win === "draw") {
      setWinner("draw");
    } else {
      setXIsNext(!xIsNext);
    }
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setBoard(getInitialBoard());
    setXIsNext(true);
    setWinner(null);
  }

  // Game status text
  let status;
  if (winner === "draw") {
    status = "It’s a draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Turn: ${xIsNext ? "X" : "O"}`;
  }

  // Styles for dark theme (inline for simplicity; use CSS for prod at scale)
  const styles = {
    root: {
      minHeight: "100dvh",
      background: COLORS.bg,
      color: COLORS.text,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      paddingTop: 60,
      fontFamily: "Inter, Roboto, Arial, sans-serif",
      transition: "background 0.25s"
    },
    score: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      gap: 40,
      margin: "2rem 0 1rem",
      fontSize: 22,
      fontWeight: 700,
      color: COLORS.primary,
      letterSpacing: "0.5px",
      textShadow: "0 1px 8px #101010cc"
    },
    status: {
      fontSize: 18,
      marginBottom: 18,
      fontWeight: 500,
      color: COLORS.accent,
      letterSpacing: "0.03rem"
    },
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 64px)",
      gridTemplateRows: "repeat(3, 64px)",
      gap: 0,
      background: COLORS.bgSecondary,
      border: `2.5px solid ${COLORS.border}`,
      borderRadius: 14,
      marginBottom: 22,
      boxShadow: "0 4px 32px 0 #0008"
    },
    cell: {
      width: 64,
      height: 64,
      fontSize: "2.2rem",
      border: `1.5px solid ${COLORS.border}`,
      background: COLORS.board,
      cursor: "pointer",
      outline: "none",
      transition: "background 0.12s, box-shadow 0.13s",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: "none",
      borderRadius: 8,
    },
    cellBtn: {
      all: 'unset',
      fontSize: "2.25rem",
      color: COLORS.text,
      fontWeight: 700,
      cursor: "pointer",
      width: "100%",
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: "auto",
      borderRadius: 8,
      transition: "background 0.13s, color 0.12s",
    },
    resetBtn: {
      marginTop: 18,
      padding: "11px 26px",
      fontSize: 17,
      background: COLORS.secondary,
      color: "#161825",
      border: "none",
      borderRadius: 7,
      cursor: "pointer",
      fontWeight: 600,
      transition: "background 0.14s, color 0.11s",
      boxShadow: "0 2px 14px 0 #ffd60022"
    }
  };

  // For contrast: If cell filled, color as X/O, else muted
  function getCellColor(i) {
    return board[i] === "X"
      ? COLORS.x
      : board[i] === "O"
        ? COLORS.o
        : COLORS.textSecondary;
  }
  function getCellShadow(i) {
    if (board[i] === "X") return "0 0 14px #75ec7abb";
    if (board[i] === "O") return "0 0 14px #84b9ffbb";
    return "none";
  }

  return (
    <div style={styles.root}>
      <div style={styles.score}>
        <span style={{ color: COLORS.x, textShadow: "0 1px 7px #323" }}>X: {scores.X}</span>
        <span style={{ color: COLORS.o, textShadow: "0 1px 7px #1477be" }}>O: {scores.O}</span>
      </div>
      <div style={styles.status}>{status}</div>
      <div style={styles.board} aria-label="Tic Tac Toe board">
        {[0,1,2,3,4,5,6,7,8].map(i =>
          <span
            key={i}
            style={{
              ...styles.cell,
              boxShadow: getCellShadow(i),
              background: winner && board[i]
                ? (board[i] === winner ? "#263548" : "#282a36")
                : COLORS.board
            }}
            className="ttt-cell"
          >
            <button
              className="ttt-btn"
              style={{
                ...styles.cellBtn,
                color: getCellColor(i),
                cursor: board[i] || winner ? "default" : "pointer",
                pointerEvents: board[i] || winner ? "none" : "auto",
                background: board[i] ? "transparent" : "none",
              }}
              onClick={() => handleCellClick(i)}
              aria-label={`cell ${i+1} ${board[i] ? board[i] : "empty"}`}
              tabIndex={0}
            >
              {board[i]}
            </button>
          </span>
        )}
      </div>
      <button style={styles.resetBtn} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
