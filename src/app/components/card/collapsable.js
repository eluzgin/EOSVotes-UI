import React from 'react';

export class CardCollapsable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  expand(event) {
    this.setState({
      expanded: true
    });
  }

  toggle(event) {
    event.stopPropagation();
    this.setState(state => ({
      expanded: !state.expanded
    }));
  }

  render() {
    return require('./collapsable.rt').call(this);
  }

}

