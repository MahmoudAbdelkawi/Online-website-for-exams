import React from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
import Accordion from "./Accordion";
// import { useDispatch } from "react-redux";
// import { usersAndExamsActions } from "../../../store/usersAndExams";
function GetUsers() {
  // const { year } = useParams();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const getUserOfThisYear = async () => {
  //     await axios
  //       .post("http://localhost:5000/getUserOfThisYear", { year })
  //       .then(({ data }) => {
  //         dispatch(usersAndExamsActions.add(data));
  //       });
  //   };
  //   getUserOfThisYear();
  // }, []);
  return <Accordion />;
}

export default GetUsers;
