import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";

import AllExams from "./components/AllExams/AllExams";
import AddExam from "./components/AddExam/AddExam";
import Settings from "./components/Settings/Settings";
import Student from "./components/Student/Student";
import Page404 from "./components/404/Page404";
import Selected from "./components/AllExams/Selected/Selected";
import School from "./components/AllExams/School/School";
import TableOfExams from "./components/AllExams/Selected/TableOfExams";
import PartialExams from "./components/AllExams/Selected/PartialExams/PartialExams";
import OutletExams from "./components/AllExams/Selected/OutletExams/OutletExams";
import Years from "./components/Users/Years/Years";
import GetUsers from "./components/Users/Years/GetUsers";
import Outlet from "./components/Settings/Outlet";
import Results from "./components/Settings/Results";
import OutletStudent from "./components/Student/OutletStudent";
import StartExam from "./components/Student/StartExam/StartExam";
import { useSelector } from "react-redux";

const LogUserIn = ({ children }) => {
    const admin = useSelector((state) => state.global.admin);
    const logedIn = useSelector((state) => state.global.logedIn);
    const location = useLocation();

    if (admin && logedIn && location.pathname.includes("/main")) {
        return children;
    } else if (!admin && logedIn && location.pathname.includes("/student")) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
    // return children
};

function Authentication() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route
                path="/main"
                element={
                    <LogUserIn>
                        <Layout />
                    </LogUserIn>
                }
            >
                <Route
                    path="/main/all"
                    element={
                        <LogUserIn>
                            <AllExams />
                        </LogUserIn>
                    }
                >
                    <Route path="/main/all" element={<School />} />
                    <Route
                        path="/main/all/select/:key"
                        element={<Selected />}
                    />
                    <Route
                        path="/main/all/select/:key/:semester"
                        element={<OutletExams />}
                    >
                        <Route
                            path="/main/all/select/:key/:semester/"
                            element={<TableOfExams />}
                        />
                        <Route
                            path="/main/all/select/:key/:semester/edit/:id"
                            element={<PartialExams />}
                        />
                    </Route>
                </Route>
                <Route
                    path="/main/add-exam"
                    element={
                        <LogUserIn>
                            <AddExam />
                        </LogUserIn>
                    }
                />
                {/* <Route
          path="/main/users"
          element={
            <LogUserIn>
              <Users />
            </LogUserIn>
          }
        /> */}
                <Route path="/main/users" element={<Years />} />
                <Route path="/main/users/:year" element={<GetUsers />} />
                <Route
                    path="/main/results"
                    element={
                        <LogUserIn>
                            <Outlet />
                        </LogUserIn>
                    }
                >
                    <Route path="/main/results" element={<Settings />} />
                    <Route
                        path="/main/results/user/:id"
                        element={<Results />}
                    />
                </Route>
            </Route>
            <Route
                path="/student"
                element={
                    <LogUserIn>
                        <OutletStudent />
                    </LogUserIn>
                }
            >
                <Route path="/student" element={<Student />} />
                <Route path="/student/start/:id/:s/:time" element={<StartExam />} />
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default Authentication;
