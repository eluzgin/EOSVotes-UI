import React from 'react';

export class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.document.body.classList.add('has-modal');
  }

  componentWillUnmount() {
    window.document.body.classList.remove('has-modal');
  }

  render() {
    return React.createElement('div', { className: 'modal' }, this.props.children);
  }

}
