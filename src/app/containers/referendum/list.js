import React from 'react';
import { connect } from 'react-redux';
import { ReferendumList } from 'components/referendum/list';
import { referendums, page } from 'store';

export default connect(

  state => ({
    filters: state.filters,
    page: state.page,
    referendums: referendums.selectors.get(state),
  }),

  {
    fetch: referendums.actions.fetch,
    next: page.actions.next,
  }

)(ReferendumList);
