// Possible Status values: 'NEW' | 'ON' | 'PAUSE' | 'ENDED'
export const initialState = { status: "NEW", interval: 1000 };

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
      console.warn("TICK action has not been implemented");
      return state;

    case "KEYPRESS":
      console.warn("KEYPRESS action has not been implemented");
      return state;

    default:
      return state;
  }
};
