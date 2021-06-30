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

function App() {
  return (
    <GameContext initialState={initialState} reducer={reducer}>
      <Header />
      <main className='main'>
        <div className='board'>
          <p>Hello World</p>
        </div>
      </main>
    </GameContext>
  );
}

export default App;
