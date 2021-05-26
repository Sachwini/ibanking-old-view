import { PageTitle } from "components/page-title";
import { Loader } from "pages/static/Loader";
import {
  Col,
  Container,
  Image,
  Row,
  Form,
  Tab,
} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import { FcOldTimeCamera } from "react-icons/fc";
import { useStateValue } from "state-provider/StateProvider";
import { UserDetailsContainer } from "styling/userDetails/UserDetailsStyling";
import "./index.css";

const Profile = () => {
  const [{ customerDetails }] = useStateValue();
  console.log("from profile", customerDetails);

  const ActiveStyle = {
    color: "#f58228",
    borderBottom: "3px solid #f58228",
    paddingBottom: "8px",
    letterSpacing: "1px",
  };

  return (
    <Container fluid>
      <PageTitle title="User Profile" />
          <Form>
            <Row>
              <Col xs={3} className="profile_background">
                <UserDetailsContainer>
                  <div className="camera_icon">
                    <Image
                      src="./userProfileImg.png"
                      alt="profile pic"
                      roundedCircle
                      className="profile_pic"
                    />
                  </div>
                  <br />
                  <div className="camera_icon">
                    <FcOldTimeCamera size={40} className="camera_icon" />
                  </div>
                </UserDetailsContainer>
              </Col> 
              <Col className="mt-3 ml-3">
                <h5>{customerDetails?.fullName}</h5>
                <h6>{customerDetails?.mobileNumber}</h6>
                <h6>{customerDetails?.email}</h6>
                <p className="mt-3 mb-3">
                  <span>{customerDetails?.bank}</span>
                </p>
                <Tabs
                  defaultActiveKey="Personal_Details"
                  transition={false}
                  id="uncontrolled-tab-example"
                >
                  <Tab
                    eventKey="Personal_Details"
                    title="Personal Details"
                    style={ActiveStyle}
                  >
                    <Row>
                      <Col>
                        <table className="table table-borderless mt-3">
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
                      </Col>
                    </Row>
                  </Tab>
                  <Tab
                    eventKey="bankDetails"
                    title="Bank Details"
                    style={ActiveStyle}
                  >
                    <Row>
                      <Col>
                        <table className="table table-borderless mt-3">
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
                              <td>
                                {customerDetails?.mobileBanking ? "yes" : "No"}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">SMS Service</th>
                              <td>
                                {customerDetails?.smsService ? "yes" : "No"}
                              </td>
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
                      </Col>
                    </Row>
                  </Tab>

                  <Tab
                    eventKey="account"
                    title="Account Details"
                    style={ActiveStyle}
                  >
                    <Row>
                      <Col>
                        {!customerDetails?.accountDetail ? (
                          <span>
                            <Loader />
                          </span>
                        ) : (
                          <table className="table table-borderless mt-3">
                            <tbody>
                              <tr>
                                <th scope="row">Branch Code</th>
                                <td>
                                  {
                                    customerDetails?.accountDetail[0][
                                      "branchCode"
                                    ]
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Main Code</th>
                                <td>
                                  {
                                    customerDetails?.accountDetail[0][
                                      "mainCode"
                                    ]
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Mobile Banking</th>
                                <td>
                                  {customerDetails?.accountDetail[0][
                                    "mobileBanking"
                                  ]
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
                                <td>
                                  {
                                    customerDetails?.accountDetail[0][
                                      "branchName"
                                    ]
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Id</th>
                                <td>
                                  {customerDetails?.accountDetail[0]["id"]}
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Account Number</th>
                                <td>
                                  {
                                    customerDetails?.accountDetail[0][
                                      "accountNumber"
                                    ]
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Available Balance</th>
                                <td>
                                  {
                                    customerDetails?.accountDetail[0][
                                      "availableBalance"
                                    ]
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Form>
    </Container>
  );
};

export default Profile;
