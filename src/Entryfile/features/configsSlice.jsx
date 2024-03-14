import { createSlice } from "@reduxjs/toolkit";

export const configsSlice = createSlice({
  name: "configs",
  initialState: [],
  reducers: {
    addConfig: (state, action) => [...state, action.payload],
    deleteConfig: (state, action) => [
      ...state.filter((config) => config.id !== action.payload.id),
    ],
    updateConfig: (state, action) => {
      const index = state.findIndex(
        (config) => config.id === action.payload.id
      );
      state[index] = action.payload;
    },
  },
});

export const { addConfig, updateConfig, deleteConfig } = configsSlice.actions;
export default configsSlice.reducer;
