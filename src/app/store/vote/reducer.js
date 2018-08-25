export const vote = (state = false, action) => {

  switch (action.type) {

    case 'VOTE_SHOW':
      return action.id;

    case 'VOTE_HIDE':
    case 'VOTE_SET':
      return false;

    default:
      return state;

  }

};
