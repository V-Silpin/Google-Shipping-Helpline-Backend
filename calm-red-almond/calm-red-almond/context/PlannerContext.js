import React, { createContext, useReducer } from 'react';
import plannerReducer from './plannerReducer';

const initialState = {
  routes: [],
  disruptions: [],
};

export const PlannerContext = createContext();

export const PlannerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(plannerReducer, initialState);

  return (
    <PlannerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlannerContext.Provider>
  );
};
