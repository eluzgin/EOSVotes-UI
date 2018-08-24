export function add(value) {

  return { type: 'FILTERS_ADD', value };

}

export function remove(index) {

  return { type: 'FILTERS_REMOVE', index };

}

