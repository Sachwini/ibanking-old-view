import { useState } from "react";
import { Card, Form, Image, InputGroup } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { setBearerToken, setRefreshToken } from "services/AuthService";
import {
  client_id,
  client_secret,
  grant_type,
  DeviceUniqueIdentifier,
} from "services/Constants";
import { useStateValue } from "state-provider/StateProvider";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  LoginContainer,
  EyeContainer,
  MyCard,
} from "styling/login/LoginStyling";
import { MyButton } from "styling/common/ButtonStyling";
import { IconStyle } from "styling/common/IconStyling";

const Login = (props: RouteComponentProps<{}>) => {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [inputFieldValueShow, setInputFieldValueShow] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageShowHandle, setErrorMessageShowHandle] =
    useState<boolean>(false);

  const [{}, dispatch] = useStateValue();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!identity || !password) return;

    const deviceUniqueIdentifier = DeviceUniqueIdentifier();
    let url = "";
    if (otpRequired) {
      url =
        "http://202.63.242.139:9091/oauth/token?client_id=" +
        client_id +
        "&client_secret=" +
        client_secret +
        "&grant_type=" +
        grant_type +
        "&deviceUniqueIdentifier=" +
        deviceUniqueIdentifier +
        "&password=" +
        password +
        "&username=" +
        identity +
        "&otp=" +
        otp;
    } else
      url =
        "http://202.63.242.139:9091/oauth/token?client_id=" +
        client_id +
        "&client_secret=" +
        client_secret +
        "&grant_type=" +
        grant_type +
        "&deviceUniqueIdentifier=" +
        deviceUniqueIdentifier +
        "&password=" +
        password +
        "&username=" +
        identity;
    try {
      const res = await axios(url, {
        method: "POST",
      });
      if (res) {
        setOtpRequired(false);
        setBearerToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);

        props.history.push("/");
        dispatch({
          type: "IS_LOGIN",
          value: true,
        });
      } else {
        setOtpRequired(false);
        props.history.push("/login");
        dispatch({
          type: "IS_LOGIN",
          value: false,
        });
      }
    } catch (error) {
      setErrorMessageShowHandle(true);
      const badCredentials = "Bad credentials";
      const invalidUser = "Invalid Mobile Number or Username";
      const maxLogin = "Maximum login attempt reached. User has been blocked.";
      const otpRequiredMsg =
        "unauthorized device. You are Logged In from another Device. If you want to Logout from that device, please verify entering OTP sent to your registered Mobile Number or registered Email.";
      const otpRequiredMsg1 =
        "unauthorized device. We have sent an numeric verification code to your registered mobile number by sms. Kindly authenticate with the received code.";
      const otpExpire = "OTP expired. Please Request a new One.";

      if (error.response.data.error_description === badCredentials) {
        setErrorMessage(error.response.data.error_description);
      }
      if (error.response.data.error_description === invalidUser) {
        setErrorMessage(error.response.data.error_description);
      }
      if (error.response.data.error_description === maxLogin) {
        setErrorMessage(error.response.data.error_description);
      }
      if (error.response.data.error_description === otpRequiredMsg) {
        setErrorMessage(error.response.data.error_description);
        setOtpRequired(true);
      }
      if (error.response.data.error_description === otpRequiredMsg1) {
        setErrorMessage(error.response.data.error_description);
        setOtpRequired(true);
      }
      if (error.response.data.error_description === otpExpire) {
        setOtpRequired(true);
      }
    }
  };

  return (
    <LoginContainer>
      <MyCard style={{ width: "30rem", marginBottom: "1rem" }}>
        <Card.Header className="image_wrapper">
          <Image
            src="./logo.png"
            alt="logo"
            roundedCircle
            className="login_logo"
          />
          <Card.Title className="login_header_text">
            {otpRequired ? "OTP Validation Form" : " Sign In To Your Account"}
          </Card.Title>
        </Card.Header>

        <Card.Body>
          {otpRequired ? (
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="OTPField" className="pb-3">
                {errorMessageShowHandle ? (
                  <Form.Text className="text-danger pb-1 text-center text-capitalize">
                    {errorMessage}
                  </Form.Text>
                ) : (
                  ""
                )}

                <Form.Label className="font-weight-bold pt-4">
                  Your OTP
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={`${inputFieldValueShow ? "password" : "text"}`}
                    name="otp"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setErrorMessageShowHandle(false);
                    }}
                    placeholder="please provide OTP here"
                    required
                  />
                  <EyeContainer
                    onClick={() => setInputFieldValueShow(!inputFieldValueShow)}
                  >
                    {inputFieldValueShow ? (
                      <IconStyle hover>
                        <AiOutlineEyeInvisible />
                      </IconStyle>
                    ) : (
                      <IconStyle hover>
                        <AiOutlineEye />
                      </IconStyle>
                    )}
                  </EyeContainer>
                </InputGroup>
              </Form.Group>

              <MyButton type="submit" width="100%">
                Submit
              </MyButton>
            </Form>
          ) : (
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username">
                {errorMessageShowHandle ? (
                  <Form.Text className="text-danger pb-1 text-center text-capitalize">
                    {errorMessage}
                  </Form.Text>
                ) : (
                  ""
                )}

                <Form.Label className="font-weight-bold">UserName</Form.Label>
                <Form.Control
                  type="text"
                  name="identity"
                  value={identity}
                  onChange={(e) => {
                    setIdentity(e.target.value);
                    setErrorMessageShowHandle(false);
                  }}
                  placeholder="Mobile Number or Email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="py-2">
                <Form.Label className="font-weight-bold">Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={`${inputFieldValueShow ? "password" : "text"}`}
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessageShowHandle(false);
                    }}
                    placeholder="Enter your password"
                    required
                  />
                  <EyeContainer
                    onClick={() => setInputFieldValueShow(!inputFieldValueShow)}
                  >
                    {inputFieldValueShow ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </EyeContainer>
                </InputGroup>
              </Form.Group>

              <MyButton type="submit" width="100%">
                Login
              </MyButton>
            </Form>
          )}
        </Card.Body>
      </MyCard>
    </LoginContainer>
  );
};

export default Login;
