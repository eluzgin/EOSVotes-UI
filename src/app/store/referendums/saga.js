import { api } from 'helpers';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* fetch({filters, page}) {
  try {
    let res = yield call(api.get, `/referendums-${page}.json`); //pass filters to api here too
    res = yield call(() => res.json());
    yield put({
      type: 'REFERENDUMS_RECEIVED',
      filters,
      page,
      res,
    });
  } catch (e) {
    console.warn(e);
  }
}


export default function* saga() {
  yield takeEvery('REFERENDUMS_FETCH', fetch);
}

