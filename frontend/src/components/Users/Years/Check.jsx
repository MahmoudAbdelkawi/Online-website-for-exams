import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, Input } from "reactstrap";
import { usersAndExamsActions } from "../../../store/usersAndExams";

function Check({ id }) {
  const { examsShown } = useSelector((state) => state.usersAndExams);
  const index = examsShown.indexOf(id);
  const dispatch = useDispatch();
  const ToggleAll = (e) => {
    const check = e.target.checked;
    const id = e.target.id;
    dispatch(usersAndExamsActions.checkAll({ id, check }));
  };
  return (
    <FormGroup check>
      <Input
        id={id}
        onChange={ToggleAll}
        type="checkbox"
        checked={index === -1 ? false : true}
      />
    </FormGroup>
  );
}

export default Check;
