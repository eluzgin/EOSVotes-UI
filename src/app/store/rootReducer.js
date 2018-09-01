import { combineReducers } from 'redux';
import { filters } from './filters/reducer';
import { page } from './page/reducer';
import { referendums } from './referendums/reducer';
import { vote } from './vote/reducer';
import scatter from './scatter/reducer';

export default combineReducers({
  filters,
  page,
  referendums,
  vote,
  scatter,
});
