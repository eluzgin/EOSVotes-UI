import { combineReducers } from 'redux';
import { stringify } from 'helpers';


const handleProposals = (res) => {
  const proposals = [];
  Object.keys(res).map(proposal_name => {
    const tally = res[proposal_name];
    const proposal = Object.assign(tally.proposal, tally.stats);
    if (typeof proposal.proposal_json === "string") proposal.proposal_json = JSON.parse(proposal.proposal_json);

    // Only show proposals not yet expired (72 hours buffer)
    const expires_at = new Date(proposal.expires_at).getTime();
    const now = Date.now();
    if ((expires_at - now) < (60 * 60 * 72)) {
      console.log(proposal.proposal_name, "was hidden due to being expired", proposal.expires_at)
      return;
    }

    // Do not show proposals with ZERO votes
    if (proposal.votes.total === 0) {
      console.log(proposal.proposal_name, "was hidden due to 0 votes")
      return;
    }
    proposals.push(proposal);
  });
  return proposals;
}

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
    const proposals = handleProposals(res);

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
      const proposals = handleProposals(res);

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
