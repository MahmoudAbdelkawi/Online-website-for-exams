import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    semester1: [],
    semester2: [],
    exams: [],
    id: null,
    name: "",
};

const exams = createSlice({
    name: "exams",
    initialState,
    reducers: {
        addExamSemesters: (state, action) => {
            localStorage.setItem("student", JSON.stringify(action.payload));
            state.semester1 = action.payload.semester1;
            state.semester2 = action.payload.semester2;
            state.name = action.payload.name;
            state.exams = action.payload.user.exams;
            state.id = action.payload.user._id;
        },
        updateExamDegree: (state, action) => {
            state.exams = state.exams.map((exam) => {
                if (exam.exam_id === action.payload.exam_id) {
                    exam.degree = action.payload.degree;
                }
                return exam;
            });
        },
    },
});

export const examsAction = exams.actions;

export default exams.reducer;
