import { fromJS } from 'immutable';
import { LOAD_SCATTER, LOAD_CLIENT, SET_IDENTITY } from './constants';

const initialState = fromJS({
  scatter: null,
  client: null,
  identity: null,
});

function ScatterReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case LOAD_SCATTER:
      return state.set('scatter', action.scatter);
    case LOAD_CLIENT:
      return state.set('client', action.client);
    case SET_IDENTITY:
      return state.set('identity', action.identity);
    default:
      return state;
  }
}

export default ScatterReducer;
