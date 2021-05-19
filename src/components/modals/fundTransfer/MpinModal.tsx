import React, { useState } from "react";
import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export interface Props {
  mpin: (mpin: string) => void;
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (e: React.FormEvent) => void;
}

const MpinModal = (props: Props) => {
  const { modalShow, handleModalShow, mpin, modalFormSubmitHandle } = props;
  const [mPinInputShow, setMpinInputShow] = useState<boolean>(true);
  return (
    <Modal
      show={modalShow}
      onHide={() => handleModalShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header closeButton>
        <Modal.Title as="h6">provide Your Transaction pin</Modal.Title> 
      </Modal.Header>
      <Modal.Body style={{ padding: "2em 3em" }}>
        <Form
          onSubmit={(e) => {
            modalFormSubmitHandle(e);
            handleModalShow(false);
          }}
        >
          <Form.Group controlId="modalForm">
            <InputGroup>
              <Form.Control
                type={`${mPinInputShow ? "password" : "text"}`}
                placeholder="Your Transaction Pin"
                required
                onChange={(e) => mpin(e.target.value)}
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
              <Form.Text className="text-muted">
                provide your transaction pin
              </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MpinModal
