import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

function render(){
  ReactDOM.render(React.createElement(App), window.document.getElementById('root'));
}

if (module.hot) {
  module.hot.accept('./app', () => {
    window.console.clear();
    render();
  });
}

window.addEventListener('load', render);
