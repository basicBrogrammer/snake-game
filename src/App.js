import "./App.css";
import GameContext, { useGameDispatch, useGameState } from "./GameContext";
import { initialState, reducer } from "./state";

const dimensions = 25;

const statusAction = {
  ON: "PAUSE",
  PAUSED: "RESUME",
  NEW: "START",
  ENDED: "START",
};

const Header = () => {
  const { status } = useGameState();
  const dispatch = useGameDispatch();
  return (
    <header className='header'>
      <p>React Game</p>
      <p>Score: (TBD)</p>
      <button onClick={() => dispatch({ type: statusAction[status] })}>{statusAction[status]}</button>
    </header>
  );
};

const Cell = ({ coordinates }) => {
  const state = useGameState();
  const classNames = ["cell"];
  if (!!state.snake.find(([x, y]) => x === coordinates[0] && y === coordinates[1])) {
    classNames.push("snake");
  }

  return <div className={classNames.join(" ")}></div>;
};

const Row = ({ yIndex }) => {
  return (
    <div className='row'>
      {[...Array(dimensions)].map((_, xIndex) => (
        <Cell key={xIndex} coordinates={[xIndex, yIndex]} />
      ))}
    </div>
  );
};

const Grid = () => {
  return [...Array(dimensions)].map((_, idx) => <Row yIndex={idx} key={idx} />);
};

function App() {
  return (
    <GameContext initialState={initialState} reducer={reducer}>
      <Header />
      <main className='main'>
        <div className='board'>
          <Grid />
        </div>
      </main>
    </GameContext>
  );
}

export default App;
