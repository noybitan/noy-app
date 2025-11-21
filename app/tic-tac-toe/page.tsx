'use client';

import React from 'react'; 
import styles from './page.module.css'; // ייבוא CSS Modules

// הגדרת טיפוסים עבור ערך הריבוע - יכול להיות 'X', 'O', או null.
type SquareValue = 'X' | 'O' | null;

// --- פונקציית בדיקת מנצח (Helper Function) ---
function calculateWinner(squares: SquareValue[]): SquareValue {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // שורות
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // עמודות
    [0, 4, 8], [2, 4, 6],           // אלכסונים
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // מחזיר 'X' או 'O'
    }
  }
  return null;
}

// --- רכיב הריבוע (Square) ---
interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    // משתמשים בקלאס מתוך CSS Modules
    <button className={styles.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}


// --- רכיב הלוח הראשי (Board) ---
export default function Board() {
  const [xIsNext, setXIsNext] = React.useState<boolean>(true); 
  const [squares, setSquares] = React.useState<SquareValue[]>(Array(9).fill(null));

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(s => s !== null)) { 
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }


  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext); 
  }

  const renderSquare = (i: number) => {
    return (
      <Square 
        key={i} 
        value={squares[i]} 
        onSquareClick={() => handleClick(i)} 
      />
    );
  };

  return (
    // משתמשים ב-container החדש כדי למרכז את כל הדף
    <div className={styles.container}> 
      
      {/* 1. כותרת ראשית */}
      <h1 className={styles.header}>TIC TAC TOE</h1>

      {/* 2. הסבר קצר */}
      <p className={styles.instructions}>
You and your opponent will take turns placing your marks (X or O) on the grid. The first player to get three marks in a continuous line (horizontal, vertical, or diagonal) wins the game.
 If the board fills up, it&apos;s a draw.
      </p>

      {/* 3. סטטוס משחק */}
      <div className={styles.status}>{status}</div> 
      
      {/* 4. לוח המשחק הממורכז */}
      <div style={{ border: '4px solid #4A90E2' }}> {/* מסגרת חיצונית ללוח */}
        {[0, 3, 6].map(start => (
          <div key={start} className={styles.boardRow}>
            {renderSquare(start)}
            {renderSquare(start + 1)}
            {renderSquare(start + 2)}
          </div>
        ))}
      </div>
    </div>
  );
}