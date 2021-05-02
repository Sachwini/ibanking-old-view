import { PageTitle } from "components/page-title";
import { apiResponse } from "models/apiResponse";
import { Loader } from "pages/static/Loader";
import {  useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { get } from "services/AjaxService";
import { useStateValue } from "state-provider/StateProvider";
import { userDetail } from "./model";

const Profile = () => {
  const [{ customerDetails }, dispatch] = useStateValue();
  const [userInfo, setUserInfo] = useState<userDetail>();
  const [customerdetails, setCustomerdetails] = useState<string>("customerdetails");

  const init = async () => {
    const res = await get<apiResponse<userDetail>>(`api/${customerdetails}`);
    if (res) {
      setUserInfo(res.data.details);
      dispatch({
        type: "USER_DETAILS",
        customerDetail: res.data.details, 
      });
    }
  };

  useEffect(() => {
    init();
  }, [customerdetails]);

  console.log("from profile", customerDetails)

  return (
    <Container fluid>
      <PageTitle title={`welcome ${customerDetails?.fullName}`} />
      <Row>
        <Col sm={12} md={6} className="mb-sm-0 mb-md-0">
          <Card className="mb-2">
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted fs-larger">
                Personal Details
              </Card.Subtitle>
              {/* <hr className="mt-0" /> */}
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Full Name</th>
                    <td>{customerDetails?.fullName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>{customerDetails?.gender}</td>
                  </tr>
                  <tr>
                    <th scope="row">State</th>
                    <td>{customerDetails?.state}</td>
                  </tr>
                  <tr>
                    <th scope="row">Pernament Address</th>
                    <td>{customerDetails?.addressOne}</td>
                  </tr>
                  <tr>
                    <th scope="row">Temporary AddressName</th>
                    <td>{customerDetails?.addressTwo}</td>
                  </tr>
                  <tr>
                    <th scope="row">City</th>
                    <td>{customerDetails?.city}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card className="mb-2">
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted fs-larger">
                Contact Details
              </Card.Subtitle>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Phone</th>
                    <td>{customerDetails?.mobileNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{customerDetails?.email}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card className="mb-2">
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted fs-larger">
                Bank Details
              </Card.Subtitle>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Bank</th>
                    <td>{customerDetails?.bank}</td>
                  </tr>
                  <tr>
                    <th scope="row">Bank Branch</th>
                    <td>{customerDetails?.bankBranch}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mobile Banking</th>
                    <td>{customerDetails?.mobileBanking ? "yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th scope="row">SMS Service</th>
                    <td>{customerDetails?.smsService ? "yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Bank Branch Code</th>
                    <td>{customerDetails?.bankBranchCode}</td>
                  </tr>
                  <tr>
                    <th scope="row">Bank Code</th>
                    <td>{customerDetails?.bankCode}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
        {!customerDetails?.accountDetail ? (
          <span>
            <Loader />
          </span>
        ) : (
          <Col sm={12} md={6}>
            <Card className="mb-2">
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted fs-larger">
                  Account Details
                </Card.Subtitle>
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">Branch Code</th>
                      <td>{customerDetails?.accountDetail[0]["branchCode"]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Main Code</th>
                      <td>{customerDetails?.accountDetail[0]["mainCode"]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Mobile Banking</th>
                      <td>
                        {customerDetails?.accountDetail[0]["mobileBanking"]
                          ? "yes"
                          : "No"}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">SMS Service</th>
                      <td>
                        {customerDetails?.accountDetail[0]["sms"]
                          ? "yes"
                          : "No"}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Branch Name</th>
                      <td>{customerDetails?.accountDetail[0]["branchName"]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Id</th>
                      <td>{customerDetails?.accountDetail[0]["id"]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Account Number</th>
                      <td>
                        {customerDetails?.accountDetail[0]["accountNumber"]}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Profile;
