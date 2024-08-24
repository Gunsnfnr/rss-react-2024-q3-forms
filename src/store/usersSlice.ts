import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    submitUser: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
  },
});

export const { submitUser } = usersSlice.actions;

export default usersSlice.reducer;
