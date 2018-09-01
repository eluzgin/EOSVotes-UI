import React from 'react';
import { connect } from 'react-redux';
import { filters } from 'store';

class Filters extends React.Component {

  remove() {
    this.props.remove();
    this.props.onRemove && this.props.onRemove();
  }

  render() {
    return require('./filters.rt').call(this);
  }

}

export default connect(

  state => ({
    filters: state.filters,
  }),

  {
    remove: filters.actions.remove,
  }

)(Filters);
