import React from "react";
import { Outlet } from "react-router-dom";

function Content() {
  return (
    <div className="h-content">
      <Outlet />
    </div>
  );
}

export default Content;
