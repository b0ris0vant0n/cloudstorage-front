import { configureStore } from '@reduxjs/toolkit';
import filesReducers from './filesReducers'; 
import userReducers from './userReducers';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    files: filesReducers,
    user: userReducers,
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
