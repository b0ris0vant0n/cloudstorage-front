import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import App from './App';
import filesReducer from './redux/reducers';

const store = configureStore({
  reducer: filesReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);