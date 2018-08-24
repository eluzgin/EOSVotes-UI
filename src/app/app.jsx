import React from 'react';
import { Home, Error503 } from 'components';
import { Provider } from 'react-redux';
import { store } from 'store';

export default class App extends React.Component {

  componentDidCatch(error) {
    this.setState({error});
  }

  render() {
    if (this.state && this.state.error) {
      return <Error503 />;
    }
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }

}

