import React from 'react';
import { Home, Error503 } from 'containers';

export default class App extends React.Component {

  componentDidCatch(error) {
    this.setState({error});
  }

  render() {
    if (this.state && this.state.error) {
      return <Error503 />;
    } else {
      return <Home />;
    }
  }

}
