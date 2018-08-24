export const page = (state = 0, action) => {

  switch (action.type) {

    case 'PAGE_NEXT':
      return state + 1;

    case 'FILTERS_ADD':
    case 'FILTERS_REMOVE':
      return 0;

    default:
      return state;

  }

};
