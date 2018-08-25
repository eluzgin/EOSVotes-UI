export function show(id) {
  return { type: 'VOTE_SHOW', id };
}

export function hide() {
  return { type: 'VOTE_HIDE' };
}

export function vote(id, flag) {
  return { type: 'VOTE_SET', id, flag };
}

export function unvote(id) {
  return { type: 'VOTE_UNVOTE', id, flag: undefined };
}

