import React from 'react';
import ReactDOM from 'react-dom';

export class CardCollapsable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.alwaysOpen
    };
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const container =  ReactDOM.findDOMNode(this);
    const placeholder = container.querySelector('.card-collapsable__placeholder-title');
    const title = container.querySelector('.card-collapsable__title');
    if (title && placeholder) {
      this.setState({
        longTitle: placeholder.offsetHeight > title.offsetHeight
      });
    }
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

