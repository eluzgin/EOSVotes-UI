export const filters = (state = [], action) => {

  switch (action.type) {
    case 'FILTERS_ADD':
      const value = action.value.trim().toLowerCase();
      const index = state.indexOf(value);
      if (index > -1) {
        return state;
      }
      return state.concat(value);

    case 'FILTERS_REMOVE':
      const newState = [].concat(state);
      newState.splice(action.index, 1);
      return newState;

    default:
      return state;
  }


};
