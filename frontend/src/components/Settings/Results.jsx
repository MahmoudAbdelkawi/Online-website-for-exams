import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ListGroup, ListGroupItem, Table } from "reactstrap";

function Results() {
    const { id } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        const getUserData = async () => {
            await axios
                .post("http://localhost:5000/getUserData", { id })
                .then(({ data }) => {
                    console.log(data);
                    setUser(data);
                });
        };
        getUserData();
    }, []);
    return (
        <div className="container mt-4">
            <ListGroup>
                <ListGroupItem className="text-capitalize">
                    Name: {user?.name}
                </ListGroupItem>
                <ListGroupItem className="text-capitalize">
                    Grade: {user?.grade}
                </ListGroupItem>
                <ListGroupItem>Email: {user?.email}</ListGroupItem>
            </ListGroup>
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Exam</th>   
                        <th>Degree</th>
                    </tr>
                </thead>
                <tbody>
                    {user?.exams &&
                        user.exams.map((exam, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>Exam <span className="mx-3">{exam.title}</span> {exam.exam_id} </td>
                                <td>
                                    {exam.degree === -1
                                        ? "not Taken"
                                        : exam.degree}
                                </td>
                            </tr>
                        ))}
                    {/* <tr>
            <th scope="row">1</th>
            <td>Exam 1</td>
            <td>90%</td>
          </tr> */}
                </tbody>
            </Table>
        </div>
    );
}

export default Results;
