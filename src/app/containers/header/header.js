import React from 'react';
import { connect } from 'react-redux';
import { filters } from 'store';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  open(menu) {
    this.setState({
      [menu]: true
    });
  }

  close(menu) {
    this.setState({
      [menu]: false
    });
  }

  render() {
    return require('./header.rt').call(this);
  }

}

export default connect(state => ({filters: state.filters.length}) )(Header);
