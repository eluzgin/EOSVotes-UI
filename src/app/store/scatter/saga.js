import { takeLatest, all, put, select } from 'redux-saga/effects';
import { networkConfig } from 'helpers';
import Eos from 'eosjs';

import { LOAD_SCATTER, GET_IDENTITY } from './constants';
import { loadClient, setIdentity, setAccount } from './actions';
import state, { selectScatter, selectIdentity, selectClient } from './selectors';


export function* voteProposal(action) {
  try {
    console.log(action);
    const identity = yield select(selectIdentity());
    const client = yield select(selectClient());
    const tx = {
      actions: [
        {
          account:'eosforumdapp',
          name:'vote',
          data: {
            voter:identity.name,
            proposer:action.id.proposer,
            proposal_name:action.id.proposal_name,
            vote:action.flag ? 1 : 0,
            proposal_hash:'',
            vote_json:'',
          },
          authorization: [{ actor:identity.name, permission:identity.authority }],
        }
      ]
    }
    const res = yield client.transaction(tx);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

export function* requestIdentity() {
  try {
    const scatter = yield select(selectScatter());
    const identity = yield select(selectIdentity());
    const client = yield select(selectClient());

    yield scatter.suggestNetwork(networkConfig);

    if(identity) {
      yield scatter.forgetIdentity();
      yield put(setIdentity(null));
      yield put(setAccount(null));
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

      const account = yield client.getAccount(match.name);
      console.log(account);
      yield put(setAccount(account));
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
      const account = yield client.getAccount(match.name);
      //console.log(account);
      yield put(setAccount(account));
    }
  } catch (err) {
    console.error(err);
  }
}

function* watchVote() {
  yield takeLatest("VOTE_SET", voteProposal);
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
    watchVote(),
  ]);
}
