import { PageTitle } from "components/page-title/index";
import {
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
// import QuickPay from "pages/activities/QuickPay";
// import UpcomingPayment from "pages/activities/UpComingPayment";
// import FixedDeposit from "pages/activities/FixedDeposit";
import { FcSynchronize } from "react-icons/fc";
import Activities from "pages/activities/Activities";
import LineChart from "pages/activities/LineChart";
import ProfileCard from "pages/user-account/user-profile/ProfileCard";
import { IconStyle } from "styling/common/IconStyling";
import styled from "styled-components";
import { GetAllAccountNumber } from "helper/CustomerData";
import { useStateValue } from "state-provider/StateProvider";

const PopoverStyle = {
  minWidth: "10rem",
  marginTop: "1rem",
};
const PopoverItem = styled.div`
  text-align: center;
  padding: 8px;
  background: #e7e7e7;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #3e4d40;
    color: #fff;
  }
`;
const Dashboard = () => {
  const getAllAccountNumber = GetAllAccountNumber();
  const [{ customerDetails }, dispatch] = useStateValue();

  const changeAccount = (value: any) => {
    dispatch({
      type: "SWITCH_ACCOUNT",
      value: value,
    });
  };

  const SwitchAccount = () => (
    <Popover id="popover-basic" style={PopoverStyle}>
      <Popover.Content style={{ padding: "0" }}>
        {getAllAccountNumber?.map((accNum: any, index: any) => {
          return (
            <PopoverItem
              key={index}
              onClick={() => {
                changeAccount(index);
              }}
            >
              {accNum}
            </PopoverItem>
          );
        })}
      </Popover.Content>
    </Popover>
  );
  return (
    <Container fluid>
      <PageTitle title="Dashboard" />
      <Row className="w-100">
        <Col md={12} lg={8}>
          <Row>
            <Col md={12} lg={6}>
              {customerDetails?.accountDetail?.length > 1 ? (
                <p className="d-flex justify-content-end">
                  <OverlayTrigger
                    transition={false}
                    trigger="click"
                    placement="bottom"
                    overlay={SwitchAccount()}
                    rootClose
                  >
                    <IconStyle hover>
                      <FcSynchronize size="24px" />
                    </IconStyle>
                  </OverlayTrigger>

                  <strong className="px-2">Switch Account</strong>
                </p>
              ) : (
                ""
              )}
              <ProfileCard />
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mt-3">
              <LineChart />
            </Col>
          </Row>
        </Col>

        <Col md={12} lg={4} className="w-100">
          {/* <PageTitle title="Request" />

          <FixedDeposit /> */}
          <Activities />
          {/* <UpcomingPayment /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
