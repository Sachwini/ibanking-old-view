import React, { createContext, useContext, useReducer } from "react";

interface Props {
  reducer: any;
  initialState: any;
  children: any;
}

// Prepare the DataLayer
export const StateContext = createContext<any>(null);

// Wrap Our App & Provide the data layer
export const StateProvider: React.FC<Props> = ({
  reducer,
  initialState,
  children,
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// pull information from the data layer
export const useStateValue = () => useContext(StateContext);
