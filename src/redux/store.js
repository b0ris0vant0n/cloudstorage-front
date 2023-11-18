import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './reducers'; 
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: filesReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});




export default store;