import React from "react";
import ShowUsers from "./ShowUsers";
function Years() {
  

  const schools = [
    {
      name: "The first middle school",
      navigate: "/main/users/year1",
    },
    {
      name: "the second middle school",
      navigate: "/main/users/year2",
    },
    {
      name: "the third middle school",
      navigate: "/main/users/year3",
    },
    {
      name: "The first secondary school",
      navigate: "/main/users/year4",
    },
    {
      name: "the second secondary school",
      navigate: "/main/users/year5",
    },
    {
      name: "the third secondary school",
    navigate: "/main/users/year6",
    },
  ];
  return (
    <div className="row m-0 p-3">
      {schools.map((school,index) => (
        <ShowUsers key={index} school={school} />
      ))}
    </div>
  );
}

export default Years;
