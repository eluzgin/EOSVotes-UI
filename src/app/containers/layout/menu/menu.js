import React from 'react';
import ReactDOM from 'react-dom';

export class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { duration: 500 };
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate(prev) {
    if (this.props.on && !prev.on) {
      this.open();
    } else if (!this.props.on && prev.on) {
      this.close();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  open() {
    this.setState({ on: true });
    // a little trick to allow css animations
    requestAnimationFrame(() => setTimeout(() => this.onOpen(), 0));
    setTimeout(() => this.setState({ entered: true }), this.state.duration/2);
    window.addEventListener('keydown', this.onKeyDown);

  }

  onOpen() {
    this.setState({ visible: true });
    const wrap = ReactDOM.findDOMNode(this);
    if (wrap) {
      new Hammer(wrap).on('swipeleft', this.props.onClose);
    }
  }

  close() {
    this.setState({
      entered: false,
      leaving: true,
    });
    setTimeout(() => this.setState({ visible: false }), this.state.duration/2);
    setTimeout(() => this.setState({ on: false, leaving: false }), this.state.duration);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event) {
    if (event.keyCode == 27) { //escape
      this.props.onClose();
    }
  }

  render() {
    return require('./menu.rt').call(this);
  }

}
