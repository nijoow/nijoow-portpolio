import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  currentTheme: string;
}

const initialState: CommonState = {
  currentTheme: "",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.currentTheme = action.payload;
    },
    toggleTheme(state) {
      state.currentTheme = state.currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("color-theme", state.currentTheme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice;
