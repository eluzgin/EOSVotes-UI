import { LOAD_SCATTER, LOAD_CLIENT, GET_IDENTITY, SET_IDENTITY, SET_ACCOUNT } from './constants';

export function loadScatter(scatter) {
  return {
    type: LOAD_SCATTER,
    scatter,
  };
}

export function loadClient(client) {
  return {
    type: LOAD_CLIENT,
    client,
  };
}

export function getIdentity() {
  return {
    type: GET_IDENTITY,
  };
}

export function setIdentity(identity) {
  return {
    type: SET_IDENTITY,
    identity,
  };
}

export function setAccount(account) {
  return {
    type: SET_ACCOUNT,
    account,
  };
}
