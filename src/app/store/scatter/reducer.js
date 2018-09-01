//import { fromJS } from 'immutable';
import { LOAD_SCATTER, LOAD_CLIENT, SET_IDENTITY } from './constants';

const initialState = {
  scatter: null,
  client: null,
  identity: null,
};

function ScatterReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SCATTER:
      return Object.assign({},state,{scatter: action.scatter});
    case LOAD_CLIENT:
      return Object.assign({},state,{client: action.client});
    case SET_IDENTITY:
      return Object.assign({},state,{identity: action.identity});
    default:
      return state;
  }
}

export default ScatterReducer;
