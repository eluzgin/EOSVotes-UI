import {combineReducers} from 'redux-immutable';
import scatterReducer from 'store/scatter/reducer';

const rootReducer = combineReducers({
  scatter: scatterReducer,
});

export default rootReducer;
