import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore'
import App from './app';

const store = configureStore();

function render(){
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    window.document.getElementById('root'));
}

if (module.hot) {
  module.hot.accept('./app', () => {
    window.console.clear();
    render();
  });
}

window.addEventListener('load', render);
