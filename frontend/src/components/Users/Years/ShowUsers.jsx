import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardTitle, CardText, Button } from "reactstrap";

function ShowUsers({ school }) {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(school.navigate);
  };
  return (
    <div className="col-sm-6 col-md-4 my-3">
      <Card body className="text-center">
        <CardTitle tag="h5" className="text-capitalize">
          {school.name}
        </CardTitle>
        <CardText className="text-capitalize">
          {school.name}, Semester 1 and Semester 2
        </CardText>
        <Button onClick={navigateTo} color="primary">
          Go
        </Button>
      </Card>
    </div>
  );
}

export default ShowUsers;
