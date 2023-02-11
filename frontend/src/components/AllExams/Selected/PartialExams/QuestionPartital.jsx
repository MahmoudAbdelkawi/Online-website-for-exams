import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { partialExamsAction } from "../../../../store/partialExams";
import { useDispatch } from "react-redux";

function QuestionPartital({
  question,
  questionIndex,
  examIndex,
  examId,
  getExams,
}) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const changes = {
      examIndex,
      questionIndex,
      value: e.target.value,
      key: e.target.type === "radio" ? "answer" : e.target.name,
    };
    dispatch(partialExamsAction.change(changes));
  };

  const handleDeleteQuestion = async (questionNumber) => {
    await axios
      .post("http://localhost:5000/deleteQuestion", {
        id: examId,
        index: questionNumber,
      })
      .then((data) => {
        dispatch(
          partialExamsAction.deleteQuestion({
            id: examId,
            index: questionNumber,
          })
        );
        getExams();
      });
  };
  return (
    <div className="my-5">
      <div className="input-group">
        <span className="input-group-text" id="basic-addon1">
          {questionIndex + 1}
        </span>
        <input
          onChange={handleChange}
          name="text"
          type="text"
          placeholder="Question"
          value={question.text}
          className="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          className={`text-secondary ms-4 p-2`}
          onClick={(e) => handleDeleteQuestion(question.number)}
        />
      </div>
      <div className="d-flex mt-3">
        <div className="input-group">
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="radio"
              checked = {question.answer === 'answer1'}
              onChange={handleChange}
              value="answer1"
              name={question.number}
              aria-label="Radio button for following text input"
            />
          </div>
          <input
            onChange={handleChange}
            name="answer1"
            type="text"
            className="form-control"
            aria-label="Text input with radio button"
            value={question.answer1}
          />
        </div>
      </div>
      <div className="d-flex mt-3">
        <div className="input-group">
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="radio"
              checked = {question.answer === 'answer2'}
              onChange={handleChange}
              value="answer2"
              name={question.number}
              aria-label="Radio button for following text input"
            />
          </div>
          <input
            onChange={handleChange}
            name="answer2"
            type="text"
            className="form-control"
            aria-label="Text input with radio button"
            value={question.answer2}
          />
        </div>
      </div>
      <div className="d-flex mt-3">
        <div className="input-group">
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="radio"
              checked = {question.answer === 'answer3'}
              onChange={handleChange}
              value="answer3"
              name={question.number}
              aria-label="Radio button for following text input"
            />
          </div>
          <input
            onChange={handleChange}
            name="answer3"
            type="text"
            className="form-control"
            aria-label="Text input with radio button"
            value={question.answer3}
          />
        </div>
      </div>
      <div className="d-flex mt-3">
        <div className="input-group">
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="radio"
              checked = {question.answer === 'answer4'}
              onChange={handleChange}
              value="answer4"
              name={question.number}
              aria-label="Radio button for following text input"
            />
          </div>
          <input
            onChange={handleChange}
            name="answer4"
            type="text"
            className="form-control"
            aria-label="Text input with radio button"
            value={question.answer4}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionPartital;
