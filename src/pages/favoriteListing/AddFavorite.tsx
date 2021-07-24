import ConfirmModal from "components/modals/favoriteAccount/ConfirmModal";
import { addFavAccount } from "helper/GetData";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { isFavAccAdded, tosterSetting } from "state-provider/forPageSetting";
import { CardBody, CardHeader, CustomCard } from "styling/common/CardStyling";
import { CustomForm } from "styling/common/FormStyling";

const AddFavorite = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [destinationBankName, setDestinationBankName] = useState<string>("");
  const [DESTAccHolderName, setDESTAccHolderName] = useState<string>("");
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [validated, setValidated] = useState(false);

  const setTosterData = useSetRecoilState(tosterSetting);
  const isFavAccountAdded = useSetRecoilState(isFavAccAdded);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);

      const res = await addFavAccount(
        accountNumber,
        destinationBankName,
        DESTAccHolderName
      );

      if (res) {
        setTosterData({
          isTost: true,
          state: res.state,
          message: (
            <div>
              <strong className="message_title">{res.messageTitle}</strong>
              <p className="message_text">{res.message}</p>
            </div>
          ),
        });
        isFavAccountAdded(true);
      }
    }
    // resetValue();
  };

  const resetValue = () => {
    setAccountNumber("");
    setDestinationBankName("");
    setDESTAccHolderName("");
  };

  return (
    <>
      <CustomCard className="card_Shadow">
        <CardHeader padding="2rem 2rem 1rem" borderColor="#f0f0f0">
          <Card.Title className="card_title">
            Add new favourite account
          </Card.Title>

          <Card.Subtitle className="card_subtitle">
            you can ad or remove your Favourite bank accounts which are mostly
            used by you for transctions
          </Card.Subtitle>
        </CardHeader>

        <CardBody padding="2rem">
          <CustomForm noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="accountNumber" className="form_group">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="account number..."
                name="accountNumber"
                value={accountNumber}
                required
                autoComplete="off"
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                account number is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="accountHoldername" className="form_group">
              <Form.Label>Account Holder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Holder Name..."
                name="DESTAccHolderName"
                value={DESTAccHolderName}
                required
                autoComplete="off"
                onChange={(e) => setDESTAccHolderName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                account holder name is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name..."
                name="destinationBankName"
                value={destinationBankName}
                required
                autoComplete="off"
                onChange={(e) => setDestinationBankName(e.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                bank name is required
              </Form.Control.Feedback>
            </Form.Group>

            <div className="submit_buttonWrapper">
              <Button className="px-5" variant="outline-success" type="submit">
                Add New One
              </Button>
            </div>
          </CustomForm>
        </CardBody>
      </CustomCard>

      <ConfirmModal
        modalShow={detailModalShow}
        handleModalShow={(event) => setDetailModalShow(event)}
        modalFormSubmitHandle={handleSubmit}
        accountNumber={accountNumber}
        destinationBankName={destinationBankName}
        destinationAccountHolderName={DESTAccHolderName}
        confirmModalCancleButton={(event) => setDetailModalShow(event)}
      />
    </>
  );
};

export default AddFavorite;
