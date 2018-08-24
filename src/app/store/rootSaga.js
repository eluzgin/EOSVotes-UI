import { all } from 'redux-saga/effects';
import referendums from './referendums/saga';
import scatter from 'store/scatter/saga';

export default function* rootSaga() {
  yield all([
    scatter(),
    referendums(),
  ]);
}
