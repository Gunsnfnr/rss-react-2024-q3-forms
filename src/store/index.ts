import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import countriesReducer from './countriesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    countriesSlice: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
