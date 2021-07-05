// Possible Status values: 'NEW' | 'ON' | 'PAUSE' | 'ENDED'
export const initialState = { status: "NEW", interval: 500, snake: [[0, 0]], direction: "RIGHT", apple: [], score: 0 };
export const dimensions = 25;
export const coordinatesEq = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const randomNumInDimensions = () => Math.floor(Math.random() * dimensions);
const randomCoordinates = () => [randomNumInDimensions(), randomNumInDimensions()];

const moveSnakeSegment = ([x, y], direction) => {
  switch (direction) {
    case "UP":
      return [x, y - 1];
    case "DOWN":
      return [x, y + 1];
    case "LEFT":
      return [x - 1, y];
    case "RIGHT":
      return [x + 1, y];
    default:
      return [x, y];
  }
};

const moveSnake = (state) => {
  const nextHead = moveSnakeSegment(state.snake[0], state.direction);

  if (coordinatesEq(nextHead, state.apple)) {
    const newApple = randomCoordinates();
    return {
      ...state,
      apple: newApple,
      snake: [nextHead, ...state.snake],
      score: state.score + 10 + state.snake.length,
      interval: state.interval - 5 * state.snake.length,
    };
  } else {
    const snakeCopy = [...state.snake];
    snakeCopy.pop(); // remove tail
    return { ...state, snake: [nextHead, ...snakeCopy] };
  }
};
const outOfGrid = ([x, y]) => x < 0 || y < 0 || x >= dimensions || y >= dimensions;

export const reducer = (state, action) => {
  console.log(`Type: ${action.type}`);

  switch (action.type) {
    case "START":
      return { ...initialState, status: "ON", apple: randomCoordinates() };

    case "RESUME":
      return { ...state, status: "ON" };

    case "PAUSE":
      return { ...state, status: "PAUSED" };

    case "GAME_OVER":
      return { ...state, status: "ENDED" };

    case "TICK":
      const newState = moveSnake(state);

      if (outOfGrid(newState.snake[0])) {
        return { ...state, status: "ENDED" };
      } else {
        return newState;
      }

    case "KEYPRESS":
      const keyToDirection = {
        ArrowUp: "UP",
        ArrowRight: "RIGHT",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
      };

      if (Object.keys(keyToDirection).includes(action.payload)) {
        return moveSnake({ ...state, direction: keyToDirection[action.payload] });
      } else {
        return state;
      }

    default:
      return state;
  }
};
