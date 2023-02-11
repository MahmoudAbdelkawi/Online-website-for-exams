import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import QuestionPartital from "./QuestionPartital";
import { useDispatch } from "react-redux";
import axios from "axios";
import { partialExamsAction } from "../../../../store/partialExams";

function PartialExams() {
  const { id } = useParams();
  const data = useSelector((state) => state.partialExams.exams);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState(data[id].title);
  const [time, setTime] = useState(data[id].time);
  const changeTime = (e) => {
    setTime(e.target.value);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const addNewQuestion = () => {
    let examIndex = params.id
    const question = {
      number: 1,
      text: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      answer: "answer1",
    };
    dispatch(partialExamsAction.addQuestion({examIndex,question}));
  };
  const getExams = async () => {
    await axios
      .post("http://localhost:5000/allExams", params)
      .then(({ data }) => {
        dispatch(partialExamsAction.addExams(data));
      });
  };



  const save = async() => {
    console.log({...data[id] , title , time});
    await axios
      .post("http://localhost:5000/updateExam", {...data[id] , title , time})
      .then(({ data }) => {
        navigate(`/main/all`)
      });
      
  };



  return (
    <div>
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
      {data[id].questions.map((el, index) => {
        return (
          <QuestionPartital
            key={index}
            examIndex={+id}
            questionIndex={index}
            question={el}
            getExams={getExams}
            examId={data[id]._id}
          />
        );
      })}
      <div className="d-flex justify-content-between my-5">
        <button onClick={addNewQuestion} className="btn btn-primary">
          Add New Question
        </button>
        <button onClick={save} className="btn btn-success">
          Save
        </button>
      </div>
    </div>
  );
}

export default PartialExams;
