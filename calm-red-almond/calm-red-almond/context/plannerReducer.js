const plannerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROUTES':
      return { ...state, routes: action.payload };
    case 'ADD_DISRUPTION':
      return { ...state, disruptions: [...state.disruptions, action.payload] };
    default:
      return state;
  }
};

export default plannerReducer;