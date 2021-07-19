import StaticBar from "components/StaticBar";
import { useState } from "react";
import { Col, Container, Row, Tab } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { forVendorPayment } from "static-data/forBreadCrumb";
import { vendorPaymentPageTitle } from "static-data/forPageTitle";
import { CustomTabs } from "styling/TabsStyling";
import ToBankAccount from "./ToBankAccount";
import ToMobileNumber from "./ToMobileNumber";

function VendorPayment() {
  const [key, setKey] = useState<any>("toMobile");
  return (
    <>
      <Container>
        <StaticBar
          pageTitle={vendorPaymentPageTitle}
          breadCrumbData={forVendorPayment}
        />

        <CustomTabs
          id="vendor-payment"
          activeKey={key}
          onSelect={(key: any) => setKey(key)}
        >
          <Tab eventKey="toMobile" title="To Mobile Number">
            <Row>
              <Col sm={12} md={6}>
                <ToMobileNumber />
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="toAccount" title="To Bank Account">
            <Row>
              <Col sm={12} md={6}>
                <ToBankAccount />
              </Col>
            </Row>
          </Tab>
        </CustomTabs>
      </Container>
      <ToastContainer />
    </>
  );
}

export default VendorPayment;
