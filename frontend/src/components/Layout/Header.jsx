import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { globalActions } from "../../store/globalSlice";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const toggleSidebar = () => {
    dispatch(globalActions.toggleSidebar());
  };
  const show = (e) => {
    e
      ? dispatch(globalActions.addExam())
      : dispatch(globalActions.addExamByPhoto());
  };
  return (
    <div className="header d-flex align-items-center ps-4">
      <div className="toggle-sidebar" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faSliders} />
      </div>
      {location.pathname === "/main/add-exam" ? (
        <>
          <button
            className="btn btn-outline-light m-3"
            onClick={() => show(true)}
          >
            Add Exam
          </button>
          <button
            className="btn btn-outline-light m-3"
            onClick={() => show(false)}
          >
            Add Exam By Photo
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
