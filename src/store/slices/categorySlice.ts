import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  currentCategory: string;
}

const initialState: CommonState = {
  currentCategory: "all",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice;
