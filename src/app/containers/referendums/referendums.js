import React from 'react';
import { connect } from 'react-redux';
import { ReferendumList } from 'components';
import { referendums, page } from 'store';

class Referendums extends React.Component {

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (!this.props.referendums) {
      this.props.fetch({
        filters: this.props.filters,
        page: this.props.page,
      });
    }
  }

  render() {
    return React.createElement(ReferendumList, this.props);
  }

}

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

)(Referendums);
