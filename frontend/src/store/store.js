import {configureStore} from '@reduxjs/toolkit'
import exams from './Exams'
import globalSlice from './globalSlice'
import questionsConverted from './QuestionsConverted'
import partialExams from './partialExams'
import usersAndExams from './usersAndExams'


const store = configureStore({
    reducer: {
        global: globalSlice,
        questionsConverted: questionsConverted,
        exams:exams,
        partialExams:partialExams,
        usersAndExams
    }
})

export default store