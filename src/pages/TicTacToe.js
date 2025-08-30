import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaTimes, FaRegCircle, FaRedo, FaGamepad } from "react-icons/fa";

function TicTacToe() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const opponentName = isArabic ? "تمّار" : "Tammar";

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  // ✅ دالة تحدد الفائز
  const calculateWinner = (squares) => {
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
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((cell) => cell)) return "Draw";
    return null;
  };

  // ✅ اللاعب يلعب X
  const handleClick = (index) => {
    if (!isUserTurn || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsUserTurn(false);
  };

  // ✅ الكمبيوتر يلعب O (MiniMax = صعوبة عالية)
  const minimax = (newBoard, isMaximizing) => {
    const result = calculateWinner(newBoard);
    if (result === "X") return -10;
    if (result === "O") return 10;
    if (result === "Draw") return 0;

    const emptyCells = newBoard
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((idx) => idx !== null);

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let idx of emptyCells) {
        newBoard[idx] = "O";
        let score = minimax(newBoard, false);
        newBoard[idx] = null;
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let idx of emptyCells) {
        newBoard[idx] = "X";
        let score = minimax(newBoard, true);
        newBoard[idx] = null;
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  };

  useEffect(() => {
    const gameWinner = calculateWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    if (!isUserTurn) {
      const emptyCells = board
        .map((cell, idx) => (cell === null ? idx : null))
        .filter((idx) => idx !== null);

      if (emptyCells.length > 0) {
        let bestScore = -Infinity;
        let move;
        for (let idx of emptyCells) {
          const newBoard = [...board];
          newBoard[idx] = "O";
          let score = minimax(newBoard, false);
          if (score > bestScore) {
            bestScore = score;
            move = idx;
          }
        }

        if (move !== undefined) {
          const newBoard = [...board];
          newBoard[move] = "O";

          setTimeout(() => {
            setBoard(newBoard);
            setIsUserTurn(true);
          }, 400);
        }
      }
    }
  }, [isUserTurn, board]);

  // ✅ إعادة اللعبة
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsUserTurn(true);
    setWinner(null);
  };

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(160deg,#0f172a,#1e293b)",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* ✅ Header مع لوقو */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <FaGamepad size={26} color="#4fc3f7" />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#4fc3f7" }}>
          Tic Tac Toe
        </h2>
      </div>

      {/* ✅ اللوحة */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 90px)",
          gap: 10,
        }}
      >
        {board.map((cell, i) => (
          <div
            key={i}
            className="tic-tac-toe-cell"
            onClick={() => handleClick(i)}
            style={{
              width: 90,
              height: 90,
              borderRadius: 16,
              background: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: "bold",
              color: cell === "X" ? "#22c55e" : "#ef4444",
              cursor: cell || winner ? "default" : "pointer",
              boxShadow: "0 6px 14px rgba(0,0,0,0.5)",
              transition: "transform 0.2s ease, background 0.3s ease",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.95)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {cell === "X" ? <FaTimes /> : cell === "O" ? <FaRegCircle /> : ""}
          </div>
        ))}
      </div>

      {/* ✅ الحالة */}
      {winner && (
        <div
          style={{
            marginTop: 20,
            fontSize: 18,
            fontWeight: 600,
            background: "rgba(255,255,255,0.08)",
            padding: "10px 18px",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          {winner === "Draw"
            ? (isArabic ? "🤝 تعادل" : "🤝 It's a Draw")
            : winner === "X"
            ? (isArabic ? "🎉 فزت!" : "🎉 You Win!")
            : isArabic
            ? `🤖 ${opponentName} فاز`
            : `🤖 ${opponentName} Wins`}
        </div>
      )}

      {/* ✅ زر إعادة */}
      {winner && (
        <button
          className="tic-tac-toe-cell"
          onClick={resetGame}
          style={{
            marginTop: 18,
            padding: "12px 26px",
            border: "none",
            borderRadius: 12,
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 15,
            boxShadow: "0 6px 14px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <FaRedo /> {isArabic ? "العب مرة أخرى" : "Play Again"}
        </button>
      )}
    </div>
  );
}

export default TicTacToe;
