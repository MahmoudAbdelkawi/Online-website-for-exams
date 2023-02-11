import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};

const questionsConverted = createSlice({
  name: "Questions_Converted",
  initialState,
  reducers: {
    addQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.push({
        ...action.payload,
        number: state.questions.length + 1,
        // number: new Date().getTime(),
      });
    },
    change: (state, action) => {
      const { index, value, key } = action.payload;
      state.questions[index][key] = value;
    },
    clearState: (state, action) => {
      let arr = [];
      state.questions = arr;
    },
  },
});

export const questionsAction = questionsConverted.actions;

export default questionsConverted.reducer;
