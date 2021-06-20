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
import { FcQuestions, FcMoneyTransfer } from "react-icons/fc";
import { FaPiggyBank } from "react-icons/fa";
import "./ConfigureService.css";
import StaticBar from "components/StaticBar";
import { userServiceSettingPageTitle } from "static-data/forPageTitle";
import { forUserServiceSetting } from "static-data/forBreadCrumb";

function ConfigureService() {
  return (
    <Container className="justify-content-center">
      <StaticBar
        pageTitle={userServiceSettingPageTitle}
        breadCrumbData={forUserServiceSetting}
      />
      <div className="d-flex flex-wrap mt-1">
        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <RiLockPasswordLine size="40px" />
            </Card.Title>
            <Card.Text className="cardText">Change Password</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <VscReport size="40px" />
            </Card.Title>
            <Card.Text className="cardText">Report</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <FiUserPlus size="40px" />
            </Card.Title>
            <Card.Text className="cardText">New Account Activate</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <BsShieldLock size="40px" />
            </Card.Title>
            <Card.Text className="cardText">Account Security</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <RiUserStarLine size="40px" />
            </Card.Title>
            <Card.Text className="cardText">Favorite Merchant</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <RiStarSmileLine size="40px" />
            </Card.Title>
            <Card.Text className="cardText">Favorite Account</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <GrDocumentTime size="40px" />
            </Card.Title>
            <Card.Text className="cardText">Schedule Transfer</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <FcMoneyTransfer size="40px" />
            </Card.Title>
            <Card.Text className="cardText">Schedule BillPayment</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <FcQuestions size="40px" />
            </Card.Title>
            <Card.Text className="cardText">Change Security Question</Card.Text>
          </Card.Body>
        </Card>

        <Card className="card__ctrl">
          <Card.Body className="cardBody__ctrl">
            <Card.Title>
              <FaPiggyBank size="40px" />
            </Card.Title>
            <Card.Text className="cardText">Fixed Deposit</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default ConfigureService;
