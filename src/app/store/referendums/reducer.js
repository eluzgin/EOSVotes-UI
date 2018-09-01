import { combineReducers } from 'redux';
import { stringify } from 'helpers';

const byQuery = (state = {}, action) => {

  if (action.type == 'REFERENDUMS_FETCH') {
    const { filters, page } = action;
    const key = stringify({ filters, page });
    const prev = stringify({ filters, page: page - 1  });
    return Object.assign({
      [key]: {
        fetching: true,
        items: [].concat( state[prev] ? state[prev].items : [] )
      }
    }, state);
  }

  if (action.type == 'REFERENDUMS_RECEIVED') {
    const { filters, page, res } = action;
    let proposals = [];

    Object.keys(res).map(proposer => {
      Object.keys(res[proposer]).map(propname => {
        proposals.push(res[proposer][propname]);
      });
    });

    const key = stringify({ filters, page });
    return Object.assign({}, state, {
      [key]: {
        fetching: false,
        more: res.more,
        items: state[key].items.concat(proposals.map((ref,id) => id))
      }
    });
  }

  return state;
};

const byId = (state = {}, action) => {

  switch (action.type) {

    case 'REFERENDUMS_RECEIVED':
      const {res} = action;
      const newState = {};
      let proposals = [];

      Object.keys(res).map(proposer => {
        Object.keys(res[proposer]).map(propname => {
          proposals.push(res[proposer][propname]);
        });
      });

      proposals.map((ref,id) => newState[id] = ref);
      return Object.assign(newState, state);

    case 'VOTE_SET':
    case 'VOTE_UNVOTE':
      return Object.assign({}, state, {
        [action.id]: Object.assign({}, state[action.id], { voted: action.flag })
      });

    default:
      return state;
  }

};

export const referendums = combineReducers({ byQuery, byId });
