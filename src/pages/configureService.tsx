import { Card, Container } from "react-bootstrap";
import {
  RiLockPasswordLine,
  RiUserStarLine,
  RiStarSmileLine,
} from "react-icons/ri";
import { VscReport } from "react-icons/vsc";
import { FiUserPlus } from "react-icons/fi";
import { BsShieldLock } from "react-icons/bs";
import { GrDocumentTime } from "react-icons/gr";
import { FcQuestions } from "react-icons/fc";
import { FaPiggyBank } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import "./iconCard.css";
import { PageTitle } from "components/page-title";

function ConfigureService() {
  return (
    <Container className="justify-content-center">
      <PageTitle
        title="Configur Services"
        subTitle="Change Your Internet Banking Settings"
      />
      <div className="d-flex flex-wrap mt-1">
        <Card className="cardItem m-2 ">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <RiLockPasswordLine size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">Change Password</span>
          </Card.Text>
        </Card>

        <Card className="cardItem m-2">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <VscReport size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">Report</span>
          </Card.Text>
        </Card>

        <Card className="cardItem m-2">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <FiUserPlus size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">New Account Activate</span>
          </Card.Text>
        </Card>

        <Card className="cardItem m-2">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <BsShieldLock size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">Account Security</span>
          </Card.Text>
        </Card>

        <Card className="cardItem m-2">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <RiUserStarLine size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">Favorite Merchant</span>
          </Card.Text>
        </Card>

        <Card className="cardItem m-2">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <RiStarSmileLine size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">Favorite Account</span>
          </Card.Text>
        </Card>

        <Card className="cardItem m-2">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <GrDocumentTime size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">Schedule Transfer</span>
          </Card.Text>
        </Card>

        <Card className="cardItem m-2">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <FcMoneyTransfer size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">Schedule BillPayment</span>
          </Card.Text>
        </Card>

        <Card className="cardItem m-2">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <FcQuestions size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">Change Security Question</span>
          </Card.Text>
        </Card>

        <Card className="cardItem m-2">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <FaPiggyBank size="40px" />
          </Card.Body>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <span className="cardText">Fixed Deposit</span>
          </Card.Text>
        </Card>
      </div>
    </Container>
  );
}

export default ConfigureService;
