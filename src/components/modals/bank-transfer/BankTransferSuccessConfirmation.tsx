import styled from "styled-components";
import { formatLakh } from "services/numberService";
import { GrDownload } from "react-icons/gr";
import { useStateValue } from "state-provider/StateProvider";
import { Button, ListGroup, Card, Container } from "react-bootstrap";
import { GiConfirmed } from "react-icons/gi";
import { useEffect, useState } from "react";
import { get } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";
import { baseUrl } from "services/BaseUrl";
import { Loader } from "pages/static/Loader";

const PaymentHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: green;
`;

function BankTransferSuccessConfirmation() {
  const [{ bankTransferDetails }] = useStateValue();
  const [loading, setLoading] = useState<boolean>(true);
  const [transactionInfo, setTransactionInfo] = useState<any[]>([]);

  useEffect(() => {
    let isSubscribed = true;
    const loadTransaction = async () => {
      try {
        const res = await get<apiResponse<any>>(
          `api/transactionhistory?mPin=${bankTransferDetails?.mpin}&page_no=1`
        );
        if (isSubscribed) {
          setTransactionInfo(res.data.details.transactionList);
          setLoading(false);
        }
      } catch {}
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
          <Card style={{ maxWidth: "40rem" }} className="card_Shadow">
            <Card.Header>
              <PaymentHeader>
                <GiConfirmed size={60} />
                <h3>Payment successful</h3>
              </PaymentHeader>
            </Card.Header>
            <Card.Body>
              <ListGroup.Item>
                <strong className="d-block mb-2">Customer Details</strong>
                <div className="d-flex justify-content-between mb-2">
                  <span>Account Number: </span>
                  <span className="text-muted">
                    {bankTransferDetails?.fromAccount}
                  </span>
                </div>
              </ListGroup.Item>
              <br />
              <ListGroup.Item>
                <strong className="d-block mb-2">Beneficiary Details</strong>
                <div className="d-flex justify-content-between mb-2">
                  <span>Destination Bank Name: </span>
                  <span className="text-muted">
                    {bankTransferDetails?.DESTBankName}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Account Number: </span>
                  <span className="text-muted">
                    {bankTransferDetails?.toAccount}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Destination AccountHolder Name: </span>
                  <span className="text-muted">
                    {bankTransferDetails?.DESTAccHolderName}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Destination Branch Name: </span>
                  <span className="text-muted">
                    {bankTransferDetails?.DESTBranchName}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Amount<small>(Rs.)</small>:
                  </span>
                  <span className="text-muted">
                    {formatLakh(bankTransferDetails?.transctionAmount)}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Charge<small>(Rs.)</small>:
                  </span>
                  <span className="text-muted">
                    {formatLakh(bankTransferDetails?.transctionCharge)}
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

export default BankTransferSuccessConfirmation;
