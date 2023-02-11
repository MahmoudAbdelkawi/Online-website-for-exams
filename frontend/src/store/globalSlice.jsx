import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSidebar: true,
  showAddExamModal: false,
  logedIn: false,
  admin: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.openSidebar = !state.openSidebar;
    },
    addExam: (state) => {
      state.showAddExamModal = true;
    },
    addExamByPhoto: (state) => {
      state.showAddExamModal = false;
    },
    setLogedIn(state) {
      state.logedIn = true
    },
    setAdmin(state) {
      state.admin = true
    },
  },
});

export const globalActions = globalSlice.actions;

export default globalSlice.reducer;
