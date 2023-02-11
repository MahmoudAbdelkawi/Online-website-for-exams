import React from "react";
import { Outlet } from "react-router-dom";

function AllExams() {
  return (
    <div className="row m-0 p-3 w-100">
      <Outlet />
    </div>
  );
}

export default AllExams