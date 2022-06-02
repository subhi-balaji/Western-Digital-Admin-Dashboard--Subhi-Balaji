export const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPUTERS":
      return {
        ...state,
        computers: action.payload,
      };
    case "SET_SELECTED":
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};
