import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    UncontrolledTooltip,
} from "reactstrap";
import Modal from "./Modal";
function Student() {
    const examsData = useSelector((state) => state.exams);
    const exams = useSelector((state) => state.exams.exams);
    const navigate = useNavigate();
    const handleStart = (exam, s , time) => {
        navigate(`/student/start/${exam._id}/${s}/${time}`);
    };
    console.log(examsData);
    const validate = (id) => {
        let degree = -1;
        exams.forEach((exam) => {
            if (id === exam.exam_id) {
                degree = exam.degree;
            }
        });
        return degree;
    };
    return (
        <div className="container mt-4">
            {examsData.semester1.length > 0 ||
            examsData.semester2.length > 0 ? (
                <>
                    <Card
                        className=" mx-auto "
                        style={{
                            maxWidth: "900px",
                        }}
                    >
                        <CardHeader>semester 1</CardHeader>
                        <ListGroup flush>
                            {examsData.semester1.map((el, index) => (
                                <ListGroupItem key={index}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>
                                            <div id={`degree${index}`}>
                                                Exam {index + 1} <span className="mx-5">{el.title}</span>
                                            </div>
                                            <UncontrolledTooltip
                                                placement="top"
                                                target={`degree${index}`}
                                            >
                                                {validate(el._id) === -1
                                                    ? "not taken"
                                                    : validate(el._id)}
                                            </UncontrolledTooltip>
                                        </span>
                                        <Modal
                                            el={el}
                                            handleStart={handleStart}
                                            time ={el.time}
                                            // ------------------
                                            validate={
                                                validate(el._id) === -1
                                                    ? false
                                                    : true
                                            }
                                            semester="semester1"
                                        />
                                    </div>
                                </ListGroupItem>
                            ))}
                            <CardHeader>semester 2</CardHeader>
                            {examsData.semester2.map((el, index) => (
                                <ListGroupItem key={index + "15985"}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>
                                            <div
                                                id={`degree${index + "15985"}`}
                                            >
                                                Exam {index + 1} <span className="mx-5">{el.title}</span>
                                            </div>
                                            <UncontrolledTooltip
                                                placement="top"
                                                target={`degree${
                                                    index + "15985"
                                                }`}
                                            >
                                                {validate(el._id) === -1
                                                    ? "not taken"
                                                    : validate(el._id)}
                                            </UncontrolledTooltip>
                                        </span>
                                        <Modal
                                            el={el}
                                            time ={el.time}
                                            handleStart={handleStart}
                                            validate={
                                                validate(el._id) === -1
                                                    ? false
                                                    : true
                                            }
                                            semester="semester2"
                                        />
                                    </div>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Card>
                </>
            ) : (
                <Alert color="primary">There aren't any available exams </Alert>
            )}

            {/* <div>Student : {examsData.name}</div>
        <div>Exams in Semester 1 : {examsData.semester1.length}</div>
        <div>Exams in Semester 2 : {examsData.semester2.length}</div> */}
        </div>
    );
}

export default Student;
