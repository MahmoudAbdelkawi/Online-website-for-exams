import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
} from "reactstrap";
import { usersAndExamsActions } from "../../../store/usersAndExams";
import Check from "./Check";

function Example(props) {
    const navigate = useNavigate();
    const { year } = useParams();
    const { exams, examsShown } = useSelector((state) => state.usersAndExams);
    const [open, setOpen] = useState("1");
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserOfThisYear = async () => {
            await axios
                .post("http://localhost:5000/getUserOfThisYear", { year })
                .then(({ data }) => {
                    let { exams } = data;
                    // TODO
                    dispatch(usersAndExamsActions.add(exams));
                });
        };
        getUserOfThisYear();
    }, []);
    const toggle = (id) => {
        if (open === id) {
            setOpen("");
        } else {
            setOpen(id);
        }
    };
    const showExams = async () => {
        // console.log(examsShown);
        await axios.post("http://localhost:5000/shownExams", {
            exams: examsShown,
            year,
        });
        navigate("/main/all");
    };
    return (
        <div className="container mt-4">
            <Accordion open={open} toggle={toggle}>
                {exams.map((exam, index) => {
                    return (
                        <AccordionItem key={index}>
                            <AccordionHeader targetId={`${index + 1}`}>
                                Exam #{index + 1}
                            </AccordionHeader>
                            <AccordionBody accordionId={`${index + 1}`}>
                                <div className="my-3 p-3 bg-body rounded shadow-sm">
                                    <div className="d-flex justify-content-between align-items-center border-bottom pb-2 ">
                                        <h6 className="mb-0">Show</h6>
                                        <Check id={exam._id} />
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    );
                })}
            </Accordion>
            <div className="my-4">
                <Button color="primary" onClick={showExams}>
                    Save
                </Button>
            </div>
        </div>
    );
}

export default Example;
