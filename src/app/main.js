import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import configureStore from 'store/configureStore'
import App from './app';
import Foo from './containers/foo/foo';

const store = configureStore();

function render(){
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/foo" component={Foo} />
        </div>
      </Router>
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
