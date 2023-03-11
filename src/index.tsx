import React from 'react';
import ReactDom from 'react-dom/client';
import './assets/scss/common.scss';
import { App } from './components/App/App';
import { seeds } from './core/api/seeds';
import { grammar } from './core/api/grammar';
import { Provider } from 'react-redux';
import { store } from './core/redux/store';
import { checkYourself } from './core/api/checkYourself';

// seeds(checkYourself).then(arr => console.log(arr));

// console.log(window.btoa(unescape(encodeURIComponent('✓ à la mode'))));
// console.log(decodeURIComponent(escape(window.atob("4pyTIMOgIGxhIG1vZGU="))))

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) {
  module.hot.accept();
}

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
