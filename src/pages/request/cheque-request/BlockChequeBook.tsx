import { FormEvent, useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { BiBlock } from "react-icons/bi";
import { localDate } from "helper/DateConfig";
import DetailModal from "components/modals/cheque-request/blockChequeBook/DetailModal";
import MpinModal from "components/modals/MpinModal";
import SuccessModal from "components/modals/cheque-request/blockChequeBook/SuccessModal";
import { post } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";
import { useRecoilValue } from "recoil";
import { getBankAccNo } from "state-provider/globalUserData";
import { v4 as uuidv4 } from "uuid";
import { CardBody, CardHeader, CustomCard } from "styling/common/CardStyling";
import { ChequeRequestContainer } from "styling/ChequeStyling";
import { CustomForm } from "styling/common/FormStyling";

function BlockChequeBook() {
  const getAllAccountNumber = useRecoilValue(getBankAccNo);
  const [fromAccount, setFromAccount] = useState<string>("");
  const [chequeNumber, setChequeNumber] = useState<string>("");
  const [mpin, setMpin] = useState<string>("");
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [successModalShow, setSuccessModalShow] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: false as boolean,
    message: "" as string,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fromAccount || !chequeNumber) {
      return;
    } else setDetailModalShow(true);
  };

  const detailModalSubmitHandle = () => {
    setDetailModalShow(false);
    setMpinModalShow(true);
  };

  const handleMpinSubmit = () => {
    setMpinModalShow(false);
    blockCheque();
  };

  const blockCheque = async () => {
    const formData = new FormData();
    formData.append("accountNumber", fromAccount);
    formData.append("chequeNumber", chequeNumber);
    formData.append("mPin", mpin);
    try {
      const res = await post<apiResponse<string>>(
        "/api/chequeblockrequest",
        formData
      );
      if (res && res.data.status.toLowerCase() === "success") {
        setSuccessModalShow(true);
        setResponseMessage({
          status: true,
          message: res.data.details,
        });
      } else {
        setSuccessModalShow(false);
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
          <div className="chequeBlock_upperHeaderWrapper">
            <h4>Block Cheque Book</h4>
            <BiBlock size={30} color="white" />
          </div>

          <p className="date">{localDate()}</p>
        </CardHeader>

        <CardBody padding="2rem 2rem 1.5rem">
          <CustomForm onSubmit={(e: FormEvent) => handleSubmit(e)}>
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
                Cheque Number
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="cheque Number..."
                  name="chequeNumber"
                  value={chequeNumber}
                  required
                  autoComplete="off"
                  onChange={(e) => setChequeNumber(e.target.value)}
                />
              </Col>
              <Form.Control.Feedback
                type="invalid"
                className={`${
                  chequeNumber === "" ? "text-center d-block" : "d-none"
                }`}
              >
                cheque number is required
              </Form.Control.Feedback>
            </Form.Group>

            <div className="button_wrapper mt-4">
              <Button className="px-4" variant="outline-danger" type="submit">
                Request
              </Button>
            </div>
          </CustomForm>
        </CardBody>
      </CustomCard>

      <DetailModal
        modalShow={detailModalShow}
        fromAccount={fromAccount}
        chequeNumber={chequeNumber}
        modalSubmitHandle={detailModalSubmitHandle}
        handleCancle={(e) => setDetailModalShow(e)}
      />

      <MpinModal
        mpinModalShow={mpinModalShow}
        setMpin={(mpin) => setMpin(mpin)}
        mpinModalSubmitHandle={handleMpinSubmit}
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

export default BlockChequeBook;
