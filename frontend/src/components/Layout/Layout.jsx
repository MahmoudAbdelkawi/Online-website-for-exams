import React from "react";
import { useSelector } from "react-redux";

import "./layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";

function Layout() {
  const { openSidebar } = useSelector((state) => state.global);
  return (
    <div className="d-flex m-0 h-100vh overflow-hidden ">
      <div className={`${!openSidebar && "sidebar-w-close"} sidebar-w`}>
        <Sidebar />
      </div>
      <div className={`${!openSidebar && "content-w-close"} content-w`}>
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default Layout;
