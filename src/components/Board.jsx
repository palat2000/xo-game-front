import { Button } from "@mui/material";
import "./board.css";

function Board({ board, handleClick, checkWinner, xIsNext, handleCancel }) {
  return (
    <div className="container-board">
      <div>{xIsNext ? "O" : "X"} Turn</div>
      <div className="board">
        {board.map((el, indexRow) => (
          <div className="board-row" key={indexRow}>
            {el.map((el, indexCol) => (
              <span
                onClick={() => handleClick(indexRow, indexCol)}
                className="board-box"
                key={indexCol}
              >
                {el}
              </span>
            ))}
          </div>
        ))}
      </div>
      <Button onClick={handleCancel} variant="contained">
        Cancel
      </Button>
    </div>
  );
}

export default Board;
