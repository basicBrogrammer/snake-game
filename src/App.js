import "./App.css";
import GameContext from "./GameContext";
import { initialState, reducer } from "./state";

const Header = () => {
  return (
    <header className='header'>
      <p>React Game</p>
      <p>Score: (TBD)</p>
      <button>Play</button>
    </header>
  );
};
const dimensions = 25;

const Cell = ({ coordinates }) => {
  return <div className='cell'></div>;
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
