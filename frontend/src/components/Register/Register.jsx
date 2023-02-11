import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {examsAction} from "../../store/Exams";
import { globalActions } from "../../store/globalSlice";
import "./style.css";
import logo from "../../assits/logo.png";
function Register() {
  const [error, setError] = useState({ value: false, message: "" });
  const [user, setUser] = useState({ email: "", password: "", name: "" ,grade : "year1" , isAdmin:false});
  const [signup, setSignup] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const sendData = async (data) => {
      axios.post("http://localhost:5000/", data).then(({ data }) => {
      
      if(data === "Wrong Email Or Password"){
        setError({
          value: true,
          message:data,
        });
      }
      if (data === "signup successfully") {
        setSignup(false);
      } else if (data.text === "Not Admin") {
        dispatch(globalActions.setLogedIn())
        dispatch(examsAction.addExamSemesters(data.data))
        navigate("/student");
      }else if(data === "Admin"){
        dispatch(globalActions.setLogedIn())
        dispatch(globalActions.setAdmin())
        navigate("/main");
      }

    });
  };

  const handleSubmit = (e) => {
    setloading(true);
    if (signup) {
      if (user["name"].length > 0 && user["password"].length > 7) {
        setError({ value: false, message: "" });
        setSignup(false)
        sendData(user);
      } else {
        setError({ value: true, message: "Enter Valid Name and Password" });
      }
    } else {
      if (user["password"].length > 7) {
        const data = {
          email: user["email"],
          password: user["password"],
        };
        setError({ value: false, message: "" });
        sendData(data);
      } else {
        setError({
          value: true,
          message: "Password must be more than 7 characters",
        });
      }
    }
    setloading(false);
  };
  const handleInput = (e) => {
    setUser((prev) => {
      prev[e.target.name] = e.target.value;
      return prev;
    });
  };
  
  return (
    <div className="form-signin-body">
      <main className="form-signin">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="text-center mb-4">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="mb-3 fw-normal text-center">
            Please {signup ? "Sign up" : "Sign in"}
          </h1>
          {error.value && (
            <h6 className="mb-3 fw-normal text-center">{error.message}</h6>
          )}

          <div className="form-floating">
            <input
              onChange={handleInput}
              name="email"
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          {signup && (
            <>
            <div className="form-floating">
              <input
                onChange={handleInput}
                type="text"
                name="name"
                className="form-control"
                id="floatingInputName"
                placeholder="Name"
              />
              <label htmlFor="floatingInputName">Name</label>
            </div>
            <div className="form-floating">
                  <select name="grade" className="w-100 height-selector" onChange={handleInput}>
                    <option value="year1">1 Prep</option>
                    <option value="year2">2 Prep</option>
                    <option value="year3">3 Prep</option>
                    <option value="year4">1 Secondary</option>
                    <option value="year5">2 Secondary</option>
                    <option value="year6">3 Secondary</option>
                  </select>
            </div>
            </>
          )}
          <div className="form-floating">
            <input
              onChange={handleInput}
              name="password"
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="d-flex flex-column gap-3 justify-content-between align-items-center btn-form-exam">
            <button
              onClick={handleSubmit}
              className="w-100 btn btn-lg btn-primary d-flex justify-content-center align-items-center gap-4"
              type="submit"
            >
              {loading && (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}

              {signup ? "Sign up" : "Sign in"}
            </button>
            <button
              onClick={() => setSignup((prev) => !prev)}
              className="btn btn-outline-secondary"
            >
              {signup ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Register;