import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  selectedCity: { name: 'Islamabad', latitude: 33.6844, longitude: 73.0479 },
};

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    },
    
});

export const { setData, setSelectedCity } = mainReducer.actions;

export default mainReducer.reducer;
