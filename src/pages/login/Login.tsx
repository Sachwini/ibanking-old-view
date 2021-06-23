import { useState } from "react";
import { Card, Form, Image, InputGroup } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import {
  getRememberMe,
  setBearerToken,
  setRefreshToken,
  setRememberMe,
} from "services/AuthService";
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
  LoginWrapper,
  PoweredBy,
} from "styling/login/LoginStyling";
import { MyButton } from "styling/common/ButtonStyling";
import { IconStyle } from "styling/common/IconStyling";
import { baseUrl } from "services/BaseUrl";
import { LogoWrapper } from "styling/layout/FooterStyling";

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
  const rememberValue = getRememberMe();

  const handleRememberMe = (value: boolean) => {
    setRememberMe(value.toString());
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!identity || !password) return;

    const deviceUniqueIdentifier = DeviceUniqueIdentifier();
    let url = "";
    if (otpRequired) {
      url = `${baseUrl}/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}&deviceUniqueIdentifier=${deviceUniqueIdentifier}&password=${password}&username=${client_id}${identity}&otp=${otp}`;
    } else
      url = `${baseUrl}/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}&deviceUniqueIdentifier=${deviceUniqueIdentifier}&password=${password}&username=${client_id}${identity}`;
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
      const maxLogin1 = "User account is locked";
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
      if (error.response.data.error_description === maxLogin1) {
        setErrorMessage(error.response.data.error_description);
      }
      if (error.response.data.error_description === otpRequiredMsg) {
        // setErrorMessage(error.response.data.error_description);
        setErrorMessage(
          "You are Logged In from another Device. If you want to Logout from that device, please verify entering OTP sent to your registered Mobile Number or registered Email."
        );
        setOtpRequired(true);
      }
      if (error.response.data.error_description === otpRequiredMsg1) {
        // setErrorMessage(error.response.data.error_description);
        setErrorMessage(
          "We have sent an numeric verification code to your registered mobile number by sms. Kindly authenticate with the received code."
        );
        setOtpRequired(true);
      }
      if (error.response.data.error_description === otpExpire) {
        setOtpRequired(true);
      }
      if (error.response.data.error_description) {
        setErrorMessage(error.response.data.error_description);
      }
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <Card style={{ width: "30rem", marginBottom: "1rem" }}>
          <Card.Header className="image_wrapper">
            <Image
              src="./logo.png"
              alt="logo"
              roundedCircle
              className="login_logo"
            />
            <Card.Title className="login_header_text">
              {otpRequired ? "OTP Validation Form" : " Sign In To iBank"}
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
                      onClick={() =>
                        setInputFieldValueShow(!inputFieldValueShow)
                      }
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
                      onClick={() =>
                        setInputFieldValueShow(!inputFieldValueShow)
                      }
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
        </Card>
        <div className="input_wrapper">
          <input
            type="checkbox"
            id="remember"
            className="remember_meInput"
            defaultChecked={rememberValue === "true" ? true : false}
            onChange={(e) => handleRememberMe(e.target.checked)}
          />
          <label htmlFor="remember">Remember Me</label>
        </div>
      </LoginWrapper>
      <PoweredBy>
        <p className="text_wrapper underline">Powered By</p>
        <LogoWrapper className="pt-3">
          <Image
            src="../ibankLogo.png"
            alt="iBanking System"
            className="logo_image pr-5"
          />
          <Image
            src="../mBankLogo.png"
            alt="iBanking System"
            className="logo_image"
          />

          <p className="power_by bold">
            Hamro Technology PVT.LTD, Kalanki Kathmandu
          </p>
        </LogoWrapper>
      </PoweredBy>
    </LoginContainer>
  );
};

export default Login;
