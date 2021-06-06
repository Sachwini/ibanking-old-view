import { apiResponse } from "models/apiResponse";
import { Loader } from "pages/static/Loader";
import { useEffect, useState } from "react";
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { GiConfirmed } from "react-icons/gi";
import { GrDownload } from "react-icons/gr";
import { get } from "services/AjaxService";
import { baseUrl } from "services/BaseUrl";
import { formatLakh } from "services/numberService";
import { useStateValue } from "state-provider/StateProvider";
import styled from "styled-components";

const PaymentHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: green;
`;

function BrokerPaymentSuccessConfirmation() {
  const [{ brokerPaymentDetails }] = useStateValue();
  const [loading, setLoading] = useState<boolean>(true);
  const [transactionInfo, setTransactionInfo] = useState<any[]>([]);

  useEffect(() => {
    let isSubscribed = true;
    const loadTransaction = async () => {
      try {
        const res = await get<apiResponse<any>>(
          `api/transactionhistory?mPin=${brokerPaymentDetails?.mpin}&page_no=1`
        );
        console.log("UseEffect called fund success");
        if (isSubscribed) {
          setTransactionInfo(res.data.details.transactionList);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadTransaction();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleDownload = async () => {
    const res = await get<apiResponse<any>>(
      `${baseUrl}/api/gettransactionreceiptpdf?transactionId=${transactionInfo[0]?.transactionIdentifier}`
    );
    if (res) {
      window.open(`${baseUrl}${res.data.detail.URL}`);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Card style={{ maxWidth: "40rem" }}>
            <Card.Header>
              <PaymentHeader>
                <GiConfirmed size={60} />
                <h3>Payment successful</h3>
              </PaymentHeader>
            </Card.Header>
            <Card.Body>
              <ListGroup.Item>
                <strong className="d-block mb-2">Client Details</strong>
                <div className="d-flex justify-content-between mb-2">
                  <span>Account Number: </span>
                  <span className="text-muted">
                    {brokerPaymentDetails?.fromAccount}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Client Name: </span>
                  <span className="text-muted">
                    {brokerPaymentDetails?.clientName}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Client Id: </span>
                  <span className="text-muted">
                    {brokerPaymentDetails?.clientId}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Mobile Number: </span>
                  <span className="text-muted">
                    {brokerPaymentDetails?.mobileNumber}
                  </span>
                </div>
              </ListGroup.Item>
              <br />
              <ListGroup.Item>
                <strong className="d-block mb-2">Beneficiary Details</strong>
                <div className="d-flex justify-content-between mb-2">
                  <span>Broker: </span>
                  <span className="text-muted">
                    {brokerPaymentDetails?.toAccount}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Amount<small>(Rs.)</small>:
                  </span>
                  <span className="text-muted">
                    {formatLakh(brokerPaymentDetails?.amount)}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Charge<small>(Rs.)</small>:
                  </span>
                  <span className="text-muted">
                    {brokerPaymentDetails?.charge}
                  </span>
                </div>
              </ListGroup.Item>
              <br />
              <Button
                onClick={handleDownload}
                className="m-0 float-left"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#a60812",
                  border: "none",
                }}
              >
                <GrDownload style={{ marginRight: "6px" }} /> Download
              </Button>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}

export default BrokerPaymentSuccessConfirmation;
