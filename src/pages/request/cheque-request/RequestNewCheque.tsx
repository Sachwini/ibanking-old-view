import { FormEvent, useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
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
import { CardBody, CardHeader, CustomCard } from "styling/common/CardStyling";
import { ChequeRequestContainer } from "styling/ChequeStyling";
import { CustomForm } from "styling/common/FormStyling";

function RequestNewCheque() {
  const getAllAccountNumber = useRecoilValue(getBankAccNo);
  const [fromAccount, setFromAccount] = useState<string>("");
  const [chequeLeaves, setChequeLeaves] = useState<string>("10");
  const [mpin, setMpin] = useState<string>("");

  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [successModalShow, setSuccessModalShow] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: false as boolean,
    message: "" as string,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!fromAccount || !chequeLeaves) {
      return;
    } else setDetailModalShow(true);
  };

  const detailModalSubmitHandle = () => {
    setDetailModalShow(false);
    setMpinModalShow(true);
  };

  const mpinModalSubmitHandle = () => {
    setMpinModalShow(false);
    requestCheque();
  };

  const requestCheque = async () => {
    const formData = new FormData();
    formData.append("accountNumber", fromAccount);
    formData.append("chequeLeaves", chequeLeaves);
    formData.append("mPin", mpin);

    try {
      const res = await post<apiResponse<string>>(
        "/api/chequerequest",
        formData
      );
      if (res && res.data.status.toLowerCase() === "success") {
        setSuccessModalShow(true);
        setResponseMessage({
          status: true,
          message: res.data.details,
        });
      } else {
        setSuccessModalShow(true);
        setResponseMessage({
          status: false,
          message: res.data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        setSuccessModalShow(true);
        setResponseMessage({
          status: false,
          message: error.response.data.message,
        });
      }
    }
  };

  return (
    <ChequeRequestContainer>
      <CustomCard className="card_Shadow">
        <CardHeader borderColor="rgba(0,0,0, 0.125)" padding="0">
          <div className="chequeRequest_upperHeaderWrapper">
            <h4>Request Cheque Book</h4>
            <BsPencilSquare size={30} color="white" />
          </div>

          <p className="date">{localDate()}</p>
        </CardHeader>

        <CardBody padding="2rem 2rem 1.5rem">
          <CustomForm onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="fromAccount" className="mb-4">
              <Form.Label column sm="4">
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
              <Form.Control.Feedback
                type="invalid"
                className={`${
                  fromAccount === "" ? "text-center d-block" : "d-none"
                }`}
              >
                account number is required
              </Form.Control.Feedback>
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

            <div className="button_wrapper mt-4">
              <Button className="px-4" variant="outline-success" type="submit">
                Request
              </Button>
            </div>
          </CustomForm>
        </CardBody>
      </CustomCard>

      <DetailModal
        modalShow={detailModalShow}
        modalSubmitHandle={detailModalSubmitHandle}
        fromAccount={fromAccount}
        chequeLeaves={chequeLeaves}
        handleCancle={(e) => setDetailModalShow(e)}
      />

      <MpinModal
        mpinModalShow={mpinModalShow}
        setMpin={(mpin) => setMpin(mpin)}
        mpinModalSubmitHandle={mpinModalSubmitHandle}
        handleCancle={(e) => setMpinModalShow(e)}
      />

      <SuccessModal
        successModalShow={successModalShow}
        handleModalShow={(e) => setSuccessModalShow(e)}
        responseMessage={responseMessage}
      />
    </ChequeRequestContainer>
  );
}

export default RequestNewCheque;
