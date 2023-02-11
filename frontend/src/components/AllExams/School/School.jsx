import React from "react";
import Exam from "../Exam";
function School() {
  

  const schools = [
    {
      name: "The first middle school",
      navigate: "/main/all/select/year1",
    },
    {
      name: "the second middle school",
      navigate: "/main/all/select/year2",
    },
    {
      name: "the third middle school",
      navigate: "/main/all/select/year3",
    },
    {
      name: "The first secondary school",
      navigate: "/main/all/select/year4",
    },
    {
      name: "the second secondary school",
      navigate: "/main/all/select/year5",
    },
    {
      name: "the third secondary school",
      navigate: "/main/all/select/year6",
    },
  ];
  return (
    <>
      {schools.map((school,index) => (
        <Exam key={index} school={school} />
      ))}
    </>
  );
}

export default School;
