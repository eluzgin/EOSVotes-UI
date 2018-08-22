import { all } from 'redux-saga/effects';
import ScatterSaga from 'store/scatter/saga'
export default function* rootSaga() {
  yield all([ScatterSaga()]);
}
