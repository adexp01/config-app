import { createSlice } from "@reduxjs/toolkit";

export const configsSlice = createSlice({
  name: "configs",
  initialState: [],
  reducers: {
    addConfig: (state, action) => {
      const result = [...state, action.payload];
      localStorage.setItem("configs", JSON.stringify(result));
      return result;
    },
    deleteConfig: (state, action) => {
      const result = [
        ...state.filter((config) => config.id !== action.payload.id),
      ];
      localStorage.setItem("configs", JSON.stringify(result));
      return result;
    },
    updateConfig: (state, action) => {
      const result = [
        ...state.map((config) =>
          config.id === action.payload.id ? action.payload : config
        ),
      ];
      localStorage.setItem("configs", JSON.stringify(result));
      return result;
    },
  },
});

export const { addConfig, updateConfig, deleteConfig } = configsSlice.actions;
export default configsSlice.reducer;
