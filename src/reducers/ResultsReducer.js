import { RESULTS_RETRIEVE, RESULTS_UPDATE } from '../actions/types';
  
  const INITIAL_STATE = {
      results: []
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case RESULTS_RETRIEVE:
        return { ...state, results: action.payload };
      case RESULTS_UPDATE:
        return { ...state, results: state.results.map((item, index) => {
            if (index !== action.payload.index) {
              // This isn't the item we care about - keep it as-is
              return item
            }
        
            // Otherwise, this is the one we want - return an updated value
            return {
              ...item,
              ...action.payload.food
            }
          }) 
        };
      default:
        return state;
    }
  };
  