import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showModal: false,
    showDetails: null,
  },
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    setShowDetails: (state, action) => {
      state.showDetails = action.payload;
    },
  },
});

export const { toggleModal, setShowDetails } = modalSlice.actions;
export default modalSlice.reducer;
