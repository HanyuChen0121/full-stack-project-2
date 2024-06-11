// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './reducers/employeeSlice';

// Load state from localStorage
const storedEmployeeData = localStorage.getItem('employeeData');
const persistedState = {
  employee: storedEmployeeData ? JSON.parse(storedEmployeeData) : undefined,
};

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  preloadedState: persistedState,
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to store updates to persist state changes to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('employeeData', JSON.stringify(state.employee));
});

export default store;