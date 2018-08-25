import React from 'react';

export class ReferendumList extends React.Component {

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
    return require('./list.rt').call(this);
  }

}

