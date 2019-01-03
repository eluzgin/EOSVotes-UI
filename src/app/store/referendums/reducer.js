import { combineReducers } from 'redux';
import { stringify } from 'helpers';


function handleProposals(res) {
  let proposals = [];
  for (const proposal_name of Object.keys(res)) {
    const tally = res[proposal_name];
    const proposal = Object.assign(tally.proposal, tally.stats);
    try {
      if (typeof proposal.proposal_json === "string") proposal.proposal_json = JSON.parse(proposal.proposal_json);
    } catch (e) {
      console.log(proposal_name, proposal.proposer, "was hidden due inproperly parsed JSON", proposal.proposal_json)
      continue;
    }

    // Only show proposals not yet expired (72 hours buffer)
    const expires_at = new Date(proposal.expires_at).getTime();
    const now = Date.now();
    const hours72 = 1000 * 60 * 60 * 72;

    if (expires_at + hours72 < now) {
      console.log(proposal_name, "was hidden due to being expired", proposal.expires_at)
      continue;
    }

    // Do not show proposals with ZERO votes
    // if (proposal.votes.total === 0) {
    //   console.log(proposal.proposal_name, "was hidden due to 0 votes")
    //   return;
    // }
    proposals.push(proposal);
  };

  // sort by largest EOS votes
  proposals = proposals.sort((a,b) => b.staked.total - a.staked.total);
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
