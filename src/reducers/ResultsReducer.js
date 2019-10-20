import {
    RESULTS_RETRIEVE
  } from '../actions/types';
  
  const INITIAL_STATE = {
      results: []
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case RESULTS_RETRIEVE:
        return { ...state, results: action.payload };
      default:
        return state;
    }
  };
  