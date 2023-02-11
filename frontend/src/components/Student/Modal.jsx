import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Modal_({ el, handleStart, semester, validate ,time }) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div>
            <Button disabled = {validate} onClick={toggle} size="sm">
                Start
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Exam Details</ModalHeader>
                <ModalBody>
                    <div>number of questions {el.questions.length}</div>
                    <div>Time {time} Minutes</div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => handleStart(el, semester , time)}
                    >
                        Start
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Modal_;
