import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    exams: [],
    examsShown: [],
};

const usersAndExams = createSlice({
    name: "usersAndExams",
    initialState,
    reducers: {
        add(state, action) {
            state.exams = action.payload;
            action.payload.forEach((exam) => {
                if (exam.isShown) {
                    state.examsShown.push(exam._id);
                }
            });
        },
        checkAll(state, action) {
            const { id, check } = action.payload;
            if (check) {
                const index = state.examsShown.indexOf(id);
                if (index === -1) {
                    state.examsShown.push(id);
                }
            } else {
                console.log(check);
                const index = state.examsShown.indexOf(id);
                if (index > -1) {
                    state.examsShown.splice(index, 1);
                }
            }
            console.log(current(state.examsShown));
        },
    },
});

export const usersAndExamsActions = usersAndExams.actions;
export default usersAndExams.reducer;
