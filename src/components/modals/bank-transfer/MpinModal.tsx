import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../../modals/index.css";

export interface Props {
  userMpin: (mPin: string) => void;
  mPinModalShow: boolean;
  mPinFormSubmitHandle: (e: React.FormEvent) => void;
  cancleButton: (show: boolean) => void;
}

const MpinModal = (props: Props) => {
  const { userMpin, mPinModalShow, mPinFormSubmitHandle, cancleButton } = props;

  const [mPinInputShow, setMpinInputShow] = useState<boolean>(true);

  return (
    <Modal
      show={mPinModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400, padding: "1em" }}
    >
      <Modal.Header closeButton className="modal_header">
        <Modal.Title as="h5">Provide Your Transaction Pin</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2em 3em" }} className="modal_body">
        <Form
          onSubmit={(e) => {
            mPinFormSubmitHandle(e);
          }}
        >
          <Form.Group controlId="modalForm" style={{ padding: "1em 0" }}>
            <InputGroup>
              <Form.Control
                type={`${mPinInputShow ? "password" : "text"}`}
                placeholder="Transction Pin Code..."
                required
                onChange={(e) => userMpin(e.target.value)}
              />
              <span
                style={{
                  marginLeft: "-1.8em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 50,
                  cursor: "pointer",
                }}
                onClick={() => setMpinInputShow(!mPinInputShow)}
              >
                {mPinInputShow ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </InputGroup>
          </Form.Group>
          <Modal.Footer>
            <div className="float-right">
              <Button
                variant="secondary"
                onClick={() => cancleButton(false)}
                style={{ padding: "7px 12px", marginRight: "1em" }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ float: "right", marginRight: "-0.9em" }}
              >
                Submit
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MpinModal;
