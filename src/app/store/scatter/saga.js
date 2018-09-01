import { takeLatest, all, put, select } from 'redux-saga/effects';
import { networkConfig } from 'helpers';
import Eos from 'eosjs';

import { LOAD_SCATTER, GET_IDENTITY } from './constants';
import { loadClient, setIdentity } from './actions';
import state, { selectScatter, selectIdentity } from './selectors';

export function* requestIdentity() {
  try {
    const scatter = yield select(selectScatter());
    const identity = yield select(selectIdentity());
    yield scatter.suggestNetwork(networkConfig);

    if(identity) {
      yield scatter.forgetIdentity();
      yield put(setIdentity(null));
    } else {
      const id = yield scatter.getIdentity({
        accounts: [
          {
            chainId: networkConfig.chainId,
            blockchain: networkConfig.blockchain,
          },
        ],
      });

      const match = id && id.accounts.find(x => x.blockchain === networkConfig.blockchain);
      yield put(setIdentity(match));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* createClient() {
  try {
    const scatter = yield select(selectScatter());

    const options = {
      broadcast: true,
      sign: true,
      chainId: networkConfig.chainId,
    };

    const client = scatter.eos(networkConfig, Eos, options, networkConfig.protocol);
    yield put(loadClient(client));

    if(scatter.identity) {
      const id = scatter.identity;
      const match = id && id.accounts.find(x => x.blockchain === networkConfig.blockchain);
      yield put(setIdentity(match));
    }
  } catch (err) {
    console.error(err);
  }
}

function* watchScatter() {
  yield takeLatest(LOAD_SCATTER, createClient);
}

function* watchIdentity() {
  yield takeLatest(GET_IDENTITY, requestIdentity);
}

export default function* rootSaga() {
  yield all([
    watchScatter(),
    watchIdentity(),
  ]);
}
