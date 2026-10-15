import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  locationName: '',
  selectedCity: 'Lahore',
};

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLocationName: (state, action) => {
      state.locationName = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    },
    
});

export const { setData, setLocationName, setSelectedCity } = mainReducer.actions;

export default mainReducer.reducer;