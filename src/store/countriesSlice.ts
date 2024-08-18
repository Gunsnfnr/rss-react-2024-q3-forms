import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../data/countries';

const initialState: {
  countries: string[];
} = {
  countries: countries,
};

export const countriesSlice = createSlice({
  name: 'countriesSlice',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
