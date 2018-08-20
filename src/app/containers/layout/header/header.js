import React from 'react';

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  openMenu() {
    this.setState({
      menu: true
    });
  }

  closeMenu() {
    this.setState({
      menu: false
    });
  }

  render() {
    return require('./header.rt').call(this);
  }

}

