import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialThemeState {
  darkMode: boolean;
}

const initialState: InitialThemeState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export const selectThemeState = (state: RootState) => state.theme;

export default themeSlice.reducer;
