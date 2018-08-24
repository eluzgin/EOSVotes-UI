export function fetch({filters, page}) {

  return {
    type: 'REFERENDUMS_FETCH',
    filters,
    page,
  };

}
