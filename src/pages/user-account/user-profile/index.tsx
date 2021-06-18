import { PageTitle } from "components/PageTitle";
import { Loader } from "pages/static/Loader";
import { Col, Container, Image, Row, Form, Tab } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import { FcOldTimeCamera } from "react-icons/fc";
import { useStateValue } from "state-provider/StateProvider";
import { UserDetailsContainer } from "styling/userDetails/UserDetailsStyling";
import { baseUrl } from "services/BaseUrl";
import "./index.css";
import { useState } from "react";
import { post } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";

const Profile = () => {
  const [{ customerDetails, switchAccount }] = useStateValue();
  const [image, setImage] = useState<string>("");
  console.log("from profile", customerDetails);

  const ActiveStyle = {
    color: "#f58228",
    borderBottom: "3px solid #f58228",
    paddingBottom: "8px",
    letterSpacing: "1px",
  };

  const handleImageChange = (e: any) => {
    if (e.target.files.length) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    await post<apiResponse<any>>("/api/profilePicture/upload", formData);
    window.location.href = `user-profile`;
  };

  return (
    <Container fluid>
      <PageTitle title="User Profile" subTitle="View your Details" />
      <hr />
      <Form>
        <Row>
          <Col xs={3} className="profile_background">
            <UserDetailsContainer>
              <Image
                src={
                  customerDetails?.imageUrl
                    ? `${baseUrl}`.concat(customerDetails?.imageUrl)
                    : "./userProfileImg.png"
                }
                alt="profile pic"
                roundedCircle
                className="profile_pic"
              />
              <br />
              <label htmlFor="upload-button">
                <FcOldTimeCamera size={40} className="camera_icon" />
              </label>
              {image ? (
                <button className="upload_button" onClick={handleUpload}>
                  upload
                </button>
              ) : (
                ""
              )}
              <input
                id="upload-button"
                type="file"
                onChange={handleImageChange}
                hidden
              />
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
                                customerDetails?.accountDetail[switchAccount][
                                  "branchCode"
                                ]
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Main Code</th>
                            <td>
                              {
                                customerDetails?.accountDetail[switchAccount][
                                  "mainCode"
                                ]
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Primary Account</th>
                            <td>
                              {customerDetails?.accountDetail[switchAccount][
                                "primary"
                              ] === "true"
                                ? "yes"
                                : "No"}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Mobile Banking</th>
                            <td>
                              {customerDetails?.accountDetail[switchAccount][
                                "mobileBanking"
                              ] === "true"
                                ? "yes"
                                : "No"}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">SMS Service</th>
                            <td>
                              {customerDetails?.accountDetail[switchAccount][
                                "sms"
                              ] === "true"
                                ? "yes"
                                : "No"}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Branch Name</th>
                            <td>
                              {
                                customerDetails?.accountDetail[switchAccount][
                                  "branchName"
                                ]
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Id</th>
                            <td>
                              {
                                customerDetails?.accountDetail[switchAccount][
                                  "id"
                                ]
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Account Number</th>
                            <td>
                              {
                                customerDetails?.accountDetail[switchAccount][
                                  "accountNumber"
                                ]
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Account Holder Name</th>
                            <td>
                              {
                                customerDetails?.accountDetail[switchAccount][
                                  "accountHolderName"
                                ]
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Accrued Interest</th>
                            <td>
                              NPR.{" "}
                              {
                                customerDetails?.accountDetail[switchAccount][
                                  "accruedInterest"
                                ]
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Available Balance</th>
                            <td>
                              NPR.{" "}
                              {
                                customerDetails?.accountDetail[switchAccount][
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
