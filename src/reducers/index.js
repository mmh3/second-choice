import { combineReducers } from 'redux';
import ResultsReducer from './ResultsReducer';

export default combineReducers({
  results: ResultsReducer
});
