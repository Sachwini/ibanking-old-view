import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export interface Props {
  userMpin: (mPin: string) => void;
  mPinModalShow: boolean;
  // handleMpinModalShow: (show: boolean) => void;
  mPinFormSubmitHandle: (e: React.FormEvent) => void;
}

const MpinModal = (props: Props) => {
  const { userMpin, mPinModalShow, mPinFormSubmitHandle } = props;

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
      <Modal.Header className="justify-content-center">
        <Modal.Title as="h5">Provide Your Transction Pin</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2em 3em" }}>
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

          <Button
            variant="primary"
            type="submit"
            style={{ float: "right", marginRight: "-0.9em" }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MpinModal;
