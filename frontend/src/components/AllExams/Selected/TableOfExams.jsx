import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Input } from "reactstrap";
import axios from "axios";
import { partialExamsAction } from "../../../store/partialExams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
function TableOfExams({ data, name }) {
    const params = useParams();
    const { exams } = useSelector((state) => state.partialExams);
    const dispatch = useDispatch();
    const [search, setSearch] = useState(exams);
    useEffect(() => {
        const getAllExams = async () => {
            await axios
                .post("http://localhost:5000/allExams", params)
                .then(({ data }) => {
                    dispatch(partialExamsAction.addExams(data));
                    setSearch(data)
                });
        };
        getAllExams();
    }, []);

    const handleDeleteID = async (id) => {
        let idx = id;
        let newData = search.filter(el => el._id !== id)
        setSearch(newData)
        await axios.post("http://localhost:5000/deleteExam", id).then(() => {
            dispatch(partialExamsAction.deleteExam(idx));
        });
    };
    const handleSearch = (e) => {
        const id = e.target.value;
        if (id) {
            const temp = search.filter((e) => e._id.includes(id));
            setSearch(temp);
        } else {
            setSearch(exams);
        }
        console.log(id);
    };
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link
                        className="text-capitalize"
                        to={`/main/all/select/${params.key}`}
                    >
                        {params.key}
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link className="text-capitalize" to={``}>
                        {params.semester}
                    </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <Input
                className="my-3 "
                placeholder="Search"
                onChange={handleSearch}
            />
            <ol className="list-group">
                {search.map((el, index) => {
                    return (
                        <div
                            className="d-flex justify-content-between"
                            key={index}
                        >
                            <Link
                                className="text-decoration-none rounded rounded-md my-1 w-100 align-items-center"
                                to={`edit/${index}`}
                            >
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold mb-3">
                                            Exam {index + 1}<span className="ms-5">{el.title}</span> <span className="ms-5">{el._id}</span>
                                        </div>
                                    </div>
                                    <span className="badge bg-primary rounded-pill mt-2">
                                        number of questions{" "}
                                        {el.questions.length}
                                    </span>
                                </li>
                            </Link>
                            <div
                                className="m-auto p-3 "
                                onClick={(e) => handleDeleteID(el._id)}
                            >
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className={`text-secondary cursor-pointer`}
                                />
                            </div>
                        </div>
                    );
                })}
            </ol>
        </div>
    );
}

export default TableOfExams;
