import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';


// connect the redux store with the slice so actions can be dispatched on it.
// configureStore is preferred when there are multiple slices which updates pieces of the global state.
// configureStore takes a config object as input.
const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;

