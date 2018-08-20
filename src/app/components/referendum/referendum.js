import React from 'react';

export class Referendum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return require('./referendum.rt').call(this);
  }

}

