import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router} from 'react-router-dom';
//import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers';
import thunkMiddleware from 'redux-thunk';
//import { configSocket } from './WebSocketService';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, logger)
  )
);
/* eslint-enable */
//configSocket(store);

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));

// <Route path="/" component={App} />

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//registerServiceWorker();
