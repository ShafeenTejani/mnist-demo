import "./assets/stylesheets/style.less";
import "./assets/stylesheets/layout.less";
import "./assets/stylesheets/pure-min.css";
import App from './App';
import reducers from './reducers';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';


const store = createStore(
	reducers,
	applyMiddleware(thunk)
);


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
