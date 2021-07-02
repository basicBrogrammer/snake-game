// Possible Status values: 'NEW' | 'ON' | 'PAUSE' | 'ENDED'
export const initialState = { status: "NEW", interval: 1000, snake: [[0, 0]], direction: "RIGHT" };

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
  const snake = state.snake.map((segment) => moveSnakeSegment(segment, state.direction));
  return { ...state, snake };
};

export const reducer = (state, action) => {
  console.log(`Type: ${action.type}`);

  switch (action.type) {
    case "START":
      return { ...initialState, status: "ON" };

    case "RESUME":
      return { ...state, status: "ON" };

    case "PAUSE":
      return { ...state, status: "PAUSED" };

    case "GAME_OVER":
      return { ...state, status: "ENDED" };

    case "TICK":
      return moveSnake(state);

    case "KEYPRESS":
      console.warn("KEYPRESS action has not been implemented");
      return state;

    default:
      return state;
  }
};
