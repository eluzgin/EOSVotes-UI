export const vote = (state = false, action) => {

  switch (action.type) {

    case 'VOTE_SHOW':
      return action.id;
    case 'VOTE_HIDE':
      return false;
    case 'VOTE_SET':
      return action.id;
    default:
      return state;

  }

};
