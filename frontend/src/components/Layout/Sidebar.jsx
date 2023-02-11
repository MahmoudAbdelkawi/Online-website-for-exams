import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assits/logo.png";

import { FaUserAlt } from "react-icons/fa";
import { AiOutlineBars, AiFillProfile, AiFillSetting } from "react-icons/ai";

function Sidebar() {
  return (
    <div className="h-sidebar">
      <div className="logo my-4 text-center">
        <img src={logo} alt="logo" />
        <h1>Exams</h1>
      </div>
      <ul className="list-unstyled">
        <li>
          <NavLink className="sidebar-link" to="/main/all">
            <AiOutlineBars className="me-3" />
            All Exams
          </NavLink>
        </li>
        <li>
          <NavLink className="sidebar-link" to="/main/add-exam">
            <AiFillProfile className="me-3" />
            Add Exam
          </NavLink>
        </li>
        <li>
          <NavLink className="sidebar-link " to="/main/users">
            <FaUserAlt className="me-3" />
            Users
          </NavLink>
        </li>
        <li>
          <NavLink className="sidebar-link" to="/main/results">
            <AiFillSetting className="me-3" />
            The Students' Results
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
