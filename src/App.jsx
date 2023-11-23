import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import Board from "./components/Board";
import StatusModal from "./components/StatusModal";
import axios from "./config/axios";
import "./app.css";
import Replay from "./components/Replay";

function App() {
  const [board, setBoard] = useState(null);
  const [number, setNumber] = useState("");
  const [xIsNext, setXIsNext] = useState(false);
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const [previousGame, setPreviousGame] = useState([]);
  const [replay, setReplay] = useState(null);

  const handleClose = async () => {
    try {
      const {
        data: { game },
      } = await axios.post("/game", {
        result: status,
        history,
      });
      setPreviousGame([game, ...previousGame]);
      setStatus(null);
      setBoard(null);
      setNumber("");
      setHistory([]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (Number(number) <= 2) return;
    const arr = new Array(Number(number)).fill(null);
    const newArr = [];
    for (let i = 0; i < number; i++) {
      newArr.push(arr);
    }
    setBoard(newArr);
  };

  const handleClick = (indexRow, indexCol) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    if (newBoard[indexRow][indexCol]) {
      return;
    }
    newBoard[indexRow][indexCol] = xIsNext ? "O" : "X";
    const newHistory = JSON.parse(JSON.stringify(history));
    newHistory.push(newBoard);
    setHistory(newHistory);
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const checkLine = (line) => {
    return line.every((cell) => cell === line[0] && cell !== null);
  };

  const checkWinner = (board) => {
    const rows = board.length;
    const cols = board[0].length;

    for (let i = 0; i < rows; i++) {
      if (checkLine(board[i])) {
        return board[i][0];
      }
    }

    for (let j = 0; j < cols; j++) {
      const column = [];
      for (let i = 0; i < rows; i++) {
        column.push(board[i][j]);
      }
      if (checkLine(column)) {
        return column[0];
      }
    }

    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < rows; i++) {
      diagonal1.push(board[i][i]);
      diagonal2.push(board[i][cols - i - 1]);
    }
    if (checkLine(diagonal1)) {
      return diagonal1[0];
    }
    if (checkLine(diagonal2)) {
      return diagonal2[0];
    }

    return null;
  };

  const checkDraw = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null) {
          // Still an empty cell, the game is not a draw
          return false;
        }
      }
    }
    // All cells are filled, the game is a draw
    return true;
  };

  const checkStatus = () => {
    setStatus(
      checkWinner(board)
        ? `Winner is ${checkWinner(board)}`
        : checkDraw(board)
        ? "Draw"
        : null
    );
  };

  const handleChooseReplay = async (id) => {
    try {
      const {
        data: { game },
      } = await axios.get(`/game/${id}`);
      setReplay(game);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setStatus(null);
    setBoard(null);
    setNumber("");
    setHistory([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { allGame },
        } = await axios.get("/game");
        setPreviousGame(allGame);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (board) {
      checkStatus();
    }
  }, [board]);

  return (
    <div className="app">
      <StatusModal status={status} handleClose={handleClose} />
      {board ? (
        <Board
          board={board}
          handleClick={handleClick}
          checkWinner={checkWinner}
          xIsNext={xIsNext}
          handleCancel={handleCancel}
        />
      ) : replay ? (
        <Replay replay={replay} handleGoBack={() => setReplay(null)} />
      ) : (
        <InputForm
          handleSubmit={handleSubmit}
          number={number}
          setNumber={setNumber}
          previousGame={previousGame}
          handleChooseReplay={handleChooseReplay}
        />
      )}
    </div>
  );
}

export default App;
