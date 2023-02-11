import React, { useEffect, useState } from "react";
import styles from "./StartExam.module.css";
import { examsAction } from "../../../store/Exams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Question from "./Question";
import { Button } from "reactstrap";
import axios from "axios";

function StartExam() {
    const examsData = useSelector((state) => state.exams);
    const userId = useSelector((state) => state.exams.id);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    console.log(params.time);
    const [exam, setExam] = useState(
        examsData[params.s].filter((el) => el._id === params.id)
    );
    const [time, setTime] = useState(1000 * (params.time) * 60); // 1000 * 1 * 60
    const [index, setIndex] = useState(0);
    const [second, setSecond] = useState(59);
    const [rotate, setRotate] = useState(false);
    useEffect(() => {
        const id = setInterval(async () => {
            setTime(time - 1000);
            setSecond((prev) => prev - 1);
        }, 1000);
        setRotate(false);

        if (time % 60000 === 0) {
            setTimer(timer - 1);
            setRotate(true);
            setSecond(59);
        }

        return () => {
            clearInterval(id);
            if (!time) {
                submit();
            }
        };
    }, [time]);
    const [timer, setTimer] = useState(params.time);
    const [answers, setAnswers] = useState({});
    const [submitExam, setSubmitExam] = useState(false);
    const [degree, setDegree] = useState(0);

    const submit = () => {
        setSubmitExam(true);
        let d = 0;
        exam[0].questions.forEach((q, index) => {
            if (q.answer === answers[`question${index}`]) {
                d += 1;
            }
        });
        d = Math.trunc((d / exam[0].questions.length) * 100);
        setDegree(d);
    };
    const finish = async () => {
        // degree, student id => userId , exam id =-> exam[0]._id
        // re fetch student data or update it manually
        await axios.post("http://localhost:5000/updateDegree", {
            exam_id: exam[0]._id,
            degree,
            userId,
        });
        dispatch(
            examsAction.updateExamDegree({ exam_id: exam[0]._id, degree })
        );
        navigate("/student");
    };
    return (
        <>
            <div className={`${styles.main} container`}>
                <div className="row text-center mt-5">
                    <div className="col-3">Exam 1</div>
                    <div className="col-6 progress mt-1 bg-white">
                        <div
                            className="rounded progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                                width: `${Math.trunc(
                                    (Object.keys(answers).length * 100) /
                                        exam[0].questions.length
                                )}%`,
                            }}
                        >
                            {Math.trunc(
                                (Object.keys(answers).length * 100) /
                                    exam[0].questions.length
                            )}
                            %
                        </div>
                    </div>
                    <div className="col-3">
                        <FontAwesomeIcon
                            icon={faHourglassStart}
                            className={`rounded-circle text-dark me-3 ${
                                rotate ? styles.rotate : ""
                            }`}
                        />
                        <span className="me-5">
                            {timer}.{second} Min
                        </span>
                    </div>
                </div>
                <div className="text-center border p-2 my-2 rounded ">
                    {submitExam && (
                        <>
                            <h1>Degree: {degree}%</h1>
                            <Button
                                onClick={finish}
                                className="mt-3"
                                color="primary"
                                size="sm"
                            >
                                Finish
                            </Button>
                        </>
                    )}
                </div>
                {exam[0].questions.map((exam, index) => (
                    <Question
                        submitExam={submitExam}
                        key={index}
                        index={index}
                        exam={exam}
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                ))}
                <div className="text-center">
                    <Button
                        onClick={submit}
                        className="mt-3 mb-4 mx-auto w-50"
                        color="success"
                        outline
                        disabled={submitExam}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </>
    );
}

export default StartExam;
