import { Button, Slider } from "@mui/material";
import { useState } from "react";

function Replay({ replay, handleGoBack }) {
  const [round, setRound] = useState(0);
  return (
    <div className="container-replay">
      <div className="container-board">
        <div>Round {round + 1}</div>
        <div className="board">
          {JSON.parse(replay?.history[round].board).map((el, indexRow) => (
            <div className="board-row" key={indexRow}>
              {el.map((el, indexCol) => (
                <span className="board-box" key={indexCol}>
                  {el}
                </span>
              ))}
            </div>
          ))}
        </div>
        <Slider
          min={0}
          max={replay?.history.length - 1}
          step={1}
          marks
          onChange={(e, newValue) => setRound(newValue)}
        />
        <Button variant="contained" onClick={handleGoBack}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default Replay;
