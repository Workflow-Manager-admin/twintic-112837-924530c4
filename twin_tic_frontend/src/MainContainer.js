import React, { useState } from "react";

/*
  TwinTic Main Container
  Features:
    - Responsive, centered Tic Tac Toe board
    - Score display (Player X / Player O)
    - Uses specified color palette and light theme
    - Real-time game state update (local state; backend can be integrated later)
*/

// Color variables (will also be added inline for simplicity)
const COLORS = {
  primary: "#4CAF50",
  secondary: "#FFC107",
  accent: "#2196F3",
  bg: "#f9f9f9",
  board: "#fff",
  border: "#e0e0e0",
  x: "#4CAF50",
  o: "#2196F3"
};

// Initial state for the board (empty)
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

  // Calculate winner or draw
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
  
  // Handle cell click/tap
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

  // Render Game Cells
  function renderCell(i) {
    return (
      <button
        className="ttt-cell"
        style={{
          color: board[i] === "X" ? COLORS.x : (board[i] === "O" ? COLORS.o : "#222"),
          background: "transparent"
        }}
        onClick={() => handleCellClick(i)}
        aria-label={`cell ${i+1} ${board[i] ? board[i] : "empty"}`}
        tabIndex={0}
      >
        {board[i]}
      </button>
    );
  }

  // Game status text
  let status;
  if (winner === "draw") {
    status = "It's a draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Turn: ${xIsNext ? "X" : "O"}`;
  }

  // Styling using CSS-in-JS for demo (for production, ideally use a CSS file or CSS modules)
  const styles = {
    root: {
      minHeight: "100dvh",
      background: COLORS.bg,
      color: "#222",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      paddingTop: 48,
      fontFamily: "Inter, Roboto, Arial, sans-serif"
    },
    score: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      gap: 40,
      margin: "2rem 0 1rem",
      fontSize: 20,
      fontWeight: 600,
      color: COLORS.primary,
      letterSpacing: "0.5px"
    },
    status: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 500,
      color: COLORS.accent,
    },
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 60px)",
      gridTemplateRows: "repeat(3, 60px)",
      gap: 0,
      background: COLORS.board,
      border: `2.5px solid ${COLORS.border}`,
      borderRadius: 14,
      boxShadow: "0 2px 12px rgba(50,50,50,0.05)",
      marginBottom: 20
    },
    cell: {
      width: 60,
      height: 60,
      fontSize: "2.2rem",
      border: `1.5px solid ${COLORS.border}`,
      background: "transparent",
      cursor: "pointer",
      outline: "none",
      transition: "background 0.1s",
    },
    resetBtn: {
      marginTop: 18,
      padding: "10px 20px",
      fontSize: 16,
      background: COLORS.secondary,
      color: "#222",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      fontWeight: 500,
      transition: "background 0.15s"
    }
  };

  // For responsive scaling, use media queries in App.css if needed.

  return (
    <div style={styles.root}>
      <div style={styles.score}>
        <span style={{color: COLORS.x}}>X: {scores.X}</span>
        <span style={{color: COLORS.o}}>O: {scores.O}</span>
      </div>
      <div style={styles.status}>{status}</div>
      <div style={styles.board} aria-label="Tic Tac Toe board">
        {[0,1,2,3,4,5,6,7,8].map(i =>
          <span key={i} style={styles.cell} className="ttt-cell">
            <button
              className="ttt-btn"
              style={{
                all: 'unset',
                fontSize: "2.1rem",
                color: board[i] === "X" ? COLORS.x : (board[i] === "O" ? COLORS.o : "#bbb"),
                cursor: board[i] || winner ? "default" : "pointer",
                width: "100%",
                height: "100%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: board[i] || winner ? "none" : "auto",
                userSelect: "none",
                borderRadius: 6,
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
