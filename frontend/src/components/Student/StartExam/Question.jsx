import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "reactstrap";
import styles from "./StartExam.module.css";
function Question({ index, exam, setAnswers, answers, submitExam }) {
    const handleChange = (e) => {
        setAnswers((prev) => {
            prev[`question${index}`] = e.target.value;
            return prev;
        });
    };
    return (
        <div
            className={`mx-auto text-center rounded border ${styles.question} p-2 my-3`}
        >
            <div className="text-start mt-2 ms-2 ">{exam.text}</div>
            <div>
                {submitExam && (
                    <h1>
                        {answers[`question${index}`] === exam.answer ? (
                            <div>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="text-success"
                                />
                            </div>
                        ) : (
                            <div>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="text-danger"
                                />
                                <h1>Correct Answer is: {exam.answer}</h1>
                            </div>
                        )}
                    </h1>
                )}
            </div>
            <hr className={`text-center`} />

            <div>
                <div
                    className={`input-group mt-2 d-flex justify-content-between ${styles.radio} border border-secondary p-2 rounded rounded-3`}
                >
                    <div className={`text-secondary ${styles.answerText} `}>
                        {exam.answer1}
                    </div>
                    <div className="">
                        <Input
                            type="radio"
                            disabled={submitExam}
                            onChange={handleChange}
                            value="answer1"
                            name={index}
                        />
                    </div>
                </div>
                <div
                    className={`input-group mt-2 d-flex justify-content-between ${styles.radio} border border-secondary p-2 rounded rounded-3`}
                >
                    <div className={`text-secondary ${styles.answerText} `}>
                        {exam.answer2}
                    </div>
                    <div className="">
                        <Input
                            type="radio"
                            disabled={submitExam}
                            onChange={handleChange}
                            value="answer2"
                            name={index}
                        />
                    </div>
                </div>
                <div
                    className={`input-group mt-2 d-flex justify-content-between ${styles.radio} border border-secondary p-2 rounded rounded-3`}
                >
                    <div className={`text-secondary ${styles.answerText} `}>
                        {exam.answer3}
                    </div>
                    <div className="">
                        <Input
                            type="radio"
                            disabled={submitExam}
                            onChange={handleChange}
                            value="answer3"
                            name={index}
                        />
                    </div>
                </div>
                <div
                    className={`input-group mt-2 d-flex justify-content-between ${styles.radio} border border-secondary p-2 rounded rounded-3`}
                >
                    <div className={`text-secondary ${styles.answerText} `}>
                        {exam.answer4}
                    </div>
                    <div className="">
                        <Input
                            type="radio"
                            disabled={submitExam}
                            onChange={handleChange}
                            value="answer4"
                            name={index}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
