import { Button } from "@mui/material";
import "./inputForm.css";

function InputForm({
  setNumber,
  number,
  handleSubmit,
  previousGame,
  handleChooseReplay,
}) {
  return (
    <div className="container-form">
      {previousGame?.length > 0 && (
        <ul className="list-game-container">
          {previousGame.map((el) => (
            <li
              onClick={() => handleChooseReplay(el.id)}
              className="list-game"
              key={el.id}
            >
              <span>No.{el.id}</span>
              <span>Result: {el.result}</span>
            </li>
          ))}
        </ul>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          {number && (
            <>
              <span>{number}</span>
              <span> X </span>
              <span>{number}</span>
            </>
          )}
        </div>
        <input
          placeholder="Enter number >= 3 for play"
          onChange={(e) => {
            if (e.target.value >= 0) {
              setNumber(e.target.value);
            }
          }}
          value={number}
          type="number"
        />
        <Button type="submit" variant="contained">
          Click
        </Button>
      </form>
    </div>
  );
}

export default InputForm;
