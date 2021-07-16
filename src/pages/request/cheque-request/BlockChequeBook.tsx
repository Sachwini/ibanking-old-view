import { useState } from "react";
import { Card, Col, Row, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { BiBlock } from "react-icons/bi";
import { localDate } from "helper/DateConfig";
import DetailModal from "components/modals/cheque-request/blockChequeBook/DetailModal";
import MpinModal from "components/modals/MpinModal";
import SuccessModal from "components/modals/cheque-request/blockChequeBook/SuccessModal";
import { post } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { getBankAccNo } from "state-provider/globalUserData";
import { v4 as uuidv4 } from "uuid";

const ActiveStyle = {
  color: "red",
  borderBottom: "3px solid red",
  letterSpacing: "1px",
};

const ChequeBlockHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  color: red;

  .space_item {
    margin-right: 20px;
  }
`;

function BlockChequeBook() {
  const getAllAccountNumber = useRecoilValue(getBankAccNo);
  const [fromAccount, setFromAccount] = useState<string>("");
  const [chequeNumber, setChequeNumber] = useState<string>("");
  const [mpin, setMpin] = useState<string>("");
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [isSuccessMessage, setIsSucessMessage] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
    details: "",
  });

  const handleReset = (e: any) => {
    e.preventDefault();
    setChequeNumber("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!fromAccount || !chequeNumber || !mpin) {
      toast.error("Incomplete field");
      return;
    }
    const formData = new FormData();
    formData.append("accountNumber", fromAccount);
    formData.append("chequeNumber", chequeNumber);
    formData.append("mPin", mpin);
    try {
      const res = await post<apiResponse<any>>(
        "/api/chequeblockrequest",
        formData
      );
      if (res) {
        setIsSucessMessage(true);
        setResponseMessage({
          status: "success",
          message: res.data.message,
          details: res.data.details,
        });
        toast.success(res.data.message);
        console.log(res.data);
      }
    } catch (error) {
      if (error.response) {
        setIsSucessMessage(true);
        setResponseMessage({
          status: "failure",
          message: error.response.data.message,
          details: error.response.data.details,
        });
        toast.error(error.response.data.message);
      }
    }
    setDetailModalShow(true);
  };

  const handleMpinSubmit = () => {
    setMpinModalShow(false);
    setIsSucessMessage(true);
  };

  return (
    <>
      <Card className="card_Shadow">
        <Card.Header>
          <ChequeBlockHeader>
            <BiBlock size={30} className="space_item" />
            <h4 className="text-muted">Block Cheque Book</h4>
          </ChequeBlockHeader>
        </Card.Header>

        <Card.Body>
          <span className="text-muted">{localDate()}</span>
          <h6 className="mt-4 text-muted">I would like to block my cheque</h6>
          <hr style={ActiveStyle} />

          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group
              as={Row}
              controlId="exampleForm.ControlSelect1"
              className="mb-4"
            >
              <Form.Label className="font-weight-bold" column sm="4">
                From Account
              </Form.Label>
              <Col>
                <Form.Control
                  as="select"
                  name="fromAccount"
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                >
                  {getAllAccountNumber.map((accNum) => {
                    return (
                      <option value={accNum.accNo} key={uuidv4()}>
                        {accNum.mainCode}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="exampleForm.ControlSelect1"
              className="mb-4"
            >
              <Form.Label className="font-weight-bold" column sm="4">
                Cheque Number
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter your cheque Number"
                  name="chequeNumber"
                  value={chequeNumber}
                  required
                  autoComplete="off"
                  onChange={(e) => setChequeNumber(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Button
              className="btn btn-light"
              variant="secondary"
              onClick={handleReset}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-warning"
              style={{ marginLeft: "20px" }}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <DetailModal
        modalShow={detailModalShow}
        handleModalShow={(event: boolean) => setDetailModalShow(event)}
        modalFormSubmitHandle={(event: boolean) => setMpinModalShow(true)}
        fromAccount={fromAccount}
        chequeNumber={chequeNumber}
        cancleButton={(event: boolean) => setDetailModalShow(false)}
      />
      <MpinModal
        mpinModalShow={mpinModalShow}
        setMpin={(mpin) => setMpin(mpin)}
        mpinModalSubmitHandle={handleMpinSubmit}
        handleCancle={(e) => setMpinModalShow(e)}
      />
      <SuccessModal
        successModalShow={isSuccessMessage}
        handleModalShow={(e) => setIsSucessMessage(e)}
        responseMessage={responseMessage}
      />
    </>
  );
}

export default BlockChequeBook;
