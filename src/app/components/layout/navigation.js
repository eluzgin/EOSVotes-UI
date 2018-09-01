import React from 'react';
export class Navigation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return require('./navigation.rt').call(this);
  }
}
