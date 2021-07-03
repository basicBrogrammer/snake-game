import "./App.css";
import GameContext, { useGameDispatch, useGameState } from "./GameContext";
import { initialState, reducer, dimensions, coordinatesEq } from "./state";

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
const GameOverBanner = () => {
  const { status } = useGameState();

  return status === "ENDED" ? (
    <div className='game-over'>
      <p>GAME OVER</p>
    </div>
  ) : null;
};

const Cell = ({ coordinates }) => {
  const state = useGameState();
  const classNames = ["cell"];

  if (!!state.snake.find((segment) => coordinatesEq(segment, coordinates))) {
    classNames.push("snake");
  }

  if (coordinatesEq(coordinates, state.apple)) {
    classNames.push("apple");
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
          <GameOverBanner />
          <Grid />
        </div>
      </main>
    </GameContext>
  );
}

export default App;
