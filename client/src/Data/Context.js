import { createContext, useReducer } from "react";
import { Reducer } from "./Reducer";

const initialState = { computers: [], selected: [] }; //set initial data.

export const Context = createContext(initialState); // create initial context for app.

export const Provider = ({ children }) => {
  // create the provider to wrap the entire application.
  const [state, dispatch] = useReducer(Reducer, initialState);

  //simple setter function to set computers state.
  const setComputers = (data) => {
    dispatch({ type: "SET_COMPUTERS", payload: data });
  };

  //simple setter function to set the selected computer's state.
  const setSelected = (name) => {
    dispatch({ type: "SET_SELECTED", payload: name });
  };

  //return the provider so we can use it elsewhere and use children as props
  return (
    <Context.Provider
      value={{
        computers: state.computers,
        setComputers,
        selected: state.selected,
        setSelected,
      }}
    >
      {children}
    </Context.Provider>
  );
};
