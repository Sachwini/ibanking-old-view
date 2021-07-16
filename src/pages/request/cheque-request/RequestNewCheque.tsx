import { useState } from "react";
import { Card, Col, Row, Button, Form } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import styled from "styled-components";
import { localDate } from "helper/DateConfig";
import { post } from "services/AjaxService";
import { toast } from "react-toastify";
import { apiResponse } from "models/apiResponse";
import DetailModal from "components/modals/cheque-request/requestNewCheque/DetailModal";
import MpinModal from "components/modals/MpinModal";
import SuccessModal from "components/modals/cheque-request/requestNewCheque/SuccessModal";
import { useRecoilValue } from "recoil";
import { getBankAccNo } from "state-provider/globalUserData";
import { v4 as uuidv4 } from "uuid";

const ChequeReqHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  color: green;

  .space_item {
    margin-right: 20px;
  }
`;

function RequestNewCheque() {
  const getAllAccountNumber = useRecoilValue(getBankAccNo);
  const [fromAccount, setFromAccount] = useState<string>("");
  const [mpin, setMpin] = useState<string>("");
  const [chequeLeaves, setChequeLeaves] = useState<string>("10");
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [isSuccessMessage, setIsSucessMessage] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
    details: "",
  });

  const ActiveStyle = {
    color: "green",
    borderBottom: "3px solid green",
    letterSpacing: "1px",
  };

  const openDetailModel = (e: any) => {
    e.preventDefault();
    setDetailModalShow(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDetailModalShow(true);

    if (!fromAccount || !mpin) {
      toast.error("No mpin");
      return;
    }
    const formData = new FormData();
    formData.append("accountNumber", fromAccount);
    formData.append("chequeLeaves", chequeLeaves);
    formData.append("mPin", mpin);
    try {
      const res = await post<apiResponse<any>>("/api/chequerequest", formData);
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
  };
  return (
    <>
      <Card className="card_Shadow">
        <Card.Header>
          <ChequeReqHeader>
            <BsPencilSquare size={30} className="space_item" />
            <h4 className="text-muted">Request Cheque Book</h4>
          </ChequeReqHeader>
        </Card.Header>
        <Card.Body>
          {/* <h3 className="mb-3">Input Details</h3> */}
          <span className="text-muted">{localDate()}</span>
          <h6 className="mt-4 text-muted">
            I would like to request cheque book
          </h6>
          <hr style={ActiveStyle} />

          <Form onSubmit={(e) => openDetailModel(e)}>
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
                No. of Copies
              </Form.Label>
              <Col>
                <Form.Control
                  as="select"
                  name="chequeLeaves"
                  value={chequeLeaves}
                  onChange={(e) => setChequeLeaves(e.target.value)}
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Button className="btn btn-light" variant="secondary">
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
        chequeLeaves={chequeLeaves}
        cancleButton={(event: boolean) => setDetailModalShow(false)}
      />
      <MpinModal
        mpinModalShow={mpinModalShow}
        setMpin={(mpin) => setMpin(mpin)}
        mpinModalSubmitHandle={() => setIsSucessMessage(true)}
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

export default RequestNewCheque;
