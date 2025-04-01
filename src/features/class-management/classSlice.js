import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [
  ],
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    removeClass: (state, action) => {
      state.classes = state.classes.filter((cls) => cls.id !== action.payload);
    },
    updateClass: (state, action) => {
      const index = state.classes.findIndex((cls) => cls.id === action.payload.id);
      if (index !== -1) {
        state.classes[index] = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addClass, removeClass, updateClass, setLoading, setError } = classSlice.actions;

export const selectClasses = (state) => state.classes.classes;
export const selectLoading = (state) => state.classes.loading;
export const selectError = (state) => state.classes.error;

export default classSlice.reducer; 