import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exams: [],
};

const partialExams = createSlice({
  name: "partialExams",
  initialState,
  reducers: {
    addExams: (state, action) => {
      state.exams = action.payload;
    },
    deleteExam: (state, action) => {
      // state.exams = [...state.exams.filter((el) => el._id !== action.payload)];
      console.log(action.payload);
      state.exams = state.exams.filter((exam) => exam._id !== action.payload);
    },
    deleteQuestion: (state, action) => {
      console.log(state.exams);
    },
    addQuestion:(state , action)=>{
      const { examIndex,question } = action.payload;
      question.number = state.exams[examIndex].questions[state.exams[examIndex].questions.length - 1]?.number + 1 
      // question.number = new Date().getTime()
      state.exams[examIndex].questions.push(question)
    },
    change: (state, action) => {
      const { examIndex, questionIndex, key, value } = action.payload;
      state.exams[examIndex].questions[questionIndex][key] = value;
    },
  },
});

export const partialExamsAction = partialExams.actions;

export default partialExams.reducer;
