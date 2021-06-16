import React, { useState } from "react";
import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../../modals/index.css";

export interface Props {
  mpin: (mpin: string) => void;
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (e: React.FormEvent) => void;
  cancleButton: (show: boolean) => void;
}

const MpinModal = (props: Props) => {
  const {
    modalShow,
    handleModalShow,
    mpin,
    modalFormSubmitHandle,
    cancleButton,
  } = props;
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
      <Modal.Header className="modal_header">
        <Modal.Title as="h6">provide Your Transaction pin</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2em 3em" }} className="modal_body">
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
                autoComplete="off"
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
                style={{ float: "right" }}
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
