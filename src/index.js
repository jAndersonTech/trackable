import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise'; 
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import './styles/index.css';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root'));
