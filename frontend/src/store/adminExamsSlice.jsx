import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exams: {
    first: {
      semester1: [],
      semester2: [],
    },
    second: {
      semester1: [],
      semester2: [],
    },
    third: {
      semester1: [],
      semester2: [],
    },
    fourth: {
      semester1: [],
      semester2: [],
    },
    fifth: {
      semester1: [],
      semester2: [],
    },
    sixth: {
      semester1: [],
      semester2: [],
    },
  },
};

const adminExamsSlice = createSlice({
  name: "allExams",
  initialState,
  reducers: {},
});

export const adminExamsActions = adminExamsSlice.actions;

export default adminExamsSlice.reducer;
