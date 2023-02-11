import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddExamModal.module.css";
import axios from "axios";
import { questionsAction } from "../../../store/QuestionsConverted";
import { useNavigate } from "react-router-dom";
import AddByPhoto from "../AddByPhoto/AddByPhoto";
import Question from "./Question";

export default function AddExamModal() {
  const [selectYear, setYear] = useState("year1");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [selectSemester, setSemester] = useState("semester1");
  const changeSelectorYear = (e) => {
    setYear(e.target.value);
  };
  const changeTime = (e) => {
    setTime(e.target.value);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeSelectorSemester = (e) => {
    setSemester(e.target.value);
  };
  const navigate = useNavigate();
  const { questions } = useSelector((state) => state.questionsConverted);
  const { showAddExamModal } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const addNewQuestion = () => {
    const example = {
      
      number: 1,
      text: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      answer: "answer1",
    };
    dispatch(questionsAction.addQuestion(example));
  };
  const saveExam = () => {
    let exams = {
      questions,
      title,
      time,
      year: selectYear,
      semester: selectSemester,
      isShown:false
    };
    console.log(exams);
    axios.post(
      "http://localhost:5000/addExams",
      exams
    ); /* .then(({ data }) => {
      dispatch(setExams(data))
    }); */
    dispatch(questionsAction.clearState());
    navigate("/main/all");
  };
  return (
    <>
      {showAddExamModal ? (
        <div className={`${styles.outerBackground}`}>
          <div
            className={`${styles.innerBackground} top-50 start-50 translate-middle bg-white`}
          >
            <div className={`p-5`}>
              <div className="d-flex flex-lg-row flex-column gap-4">
                <select
                  value={selectYear}
                  onChange={(e) => changeSelectorYear(e)}
                  name="year"
                  className="form-select"
                >
                  <option value="year1">First Year</option>
                  <option value="year2">Second Year</option>
                  <option value="year3">Third Year</option>
                  <option value="year4">Fourth Year</option>
                  <option value="year5">Fifth Year</option>
                  <option value="year6">Sixth Year</option>
                </select>
                <select
                  value={selectSemester}
                  onChange={(e) => changeSelectorSemester(e)}
                  name="semester"
                  className="form-select"
                >
                  <option value="semester1">Semester 1</option>
                  <option value="semester2">Semester 2</option>
                </select>
              </div>
              <div className="d-flex flex-lg-row flex-column gap-4 mt-3">
                <input type="text"
                  value={title}
                  onChange={(e) => changeTitle(e)}
                  name="title"
                  className="form-control"
                  placeholder="Exam Title"
                />
                  
                  <input type="text"
                  value={time}
                  onChange={(e) => changeTime(e)}
                  name="time"
                  className="form-control"
                  placeholder="Exam time"
                />
                
              </div>
              
              {questions.map((question, index) => (
                <Question
                  key={question.number}
                  index={index}
                  question={question}
                />
              ))}

              <div className="d-flex justify-content-between my-5">
                <button onClick={addNewQuestion} className="btn btn-primary">
                  Add New Question
                </button>
                <button onClick={saveExam} className="btn btn-success">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AddByPhoto />
      )}
    </>
  );
}
