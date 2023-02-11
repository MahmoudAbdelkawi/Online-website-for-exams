import { Card, CardTitle, Button } from "reactstrap";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function Selected() {
  const { key } = useParams();
  const navigate = useNavigate();
  return (
    <div className="row m-0 gap-3">
      <div className="col-sm-4">
        <Card body className="text-center">
          <CardTitle tag="h5" className="text-capitalize">
            Semester 1
          </CardTitle>
          <Button
            onClick={() => navigate(`/main/all/select/${key}/semester1`)}
            color="primary"
          >
            Go
          </Button>
        </Card>
      </div>
      <div className="col-sm-4">
        <Card body className="text-center">
          <CardTitle tag="h5" className="text-capitalize">
            Semester 2
          </CardTitle>
          <Button
            onClick={() => navigate(`/main/all/select/${key}/semester2`)}
            color="primary"
          >
            Go
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Selected;
