import { useState } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import {
  setBearerToken,
  setRefreshToken,
} from "services/AuthService";
import {
  client_id,
  client_secret,
  grant_type,
  DeviceUniqueIdentifier,
} from "services/Constants";
import { useStateValue } from "state-provider/StateProvider";
import axios from "axios";
import OtpModal from "components/modals/fundTransfer/OtpModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = (props: RouteComponentProps<{}>) => {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>();
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [mPinInputShow, setMpinInputShow] = useState<boolean>(true);

  const [{}, dispatch] = useStateValue();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!identity || !password) return;
    setLoading(true);

    const deviceUniqueIdentifier = DeviceUniqueIdentifier();
    let url = ""
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
    }
    else url =
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
        setBearerToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        console.log("message :", res.data);
        props.history.push("/");
        dispatch({
          type: "IS_LOGIN",
          value: true,
        });
      } else {
        console.log("messsage:");
        props.history.push("/login");
        dispatch({
          type: "IS_LOGIN",
          value: false,
        });
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log("Message", error.response.data);
        const otpRequiredMsg =
          "unauthorized device. You are Logged In from another Device. If you want to Logout from that device, please verify entering OTP sent to your registered Mobile Number or registered Email.";
        const otpRequiredMsg1 =
          "unauthorized device. We have sent an numeric verification code to your registered mobile number by sms. Kindly authenticate with the received code.";
        if (
          error.response.data.error_description === otpRequiredMsg ||
          otpRequiredMsg1
        ) {
          setOtpRequired(true);
          alert(error.response.data.error_description);
        }
      }
    }
  };

  return (
    <Container
      style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}
    >
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <hr />
          <Form>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Identity VBMRDWEVFV9840069570 VBMRDWEVFV9843750574
              </Form.Label>
              <Form.Control
                type="text"
                name="identity"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="Mobile Number or Email"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Password 22069 10368
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={`${mPinInputShow ? "password" : "text"}`}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span
                  style={{
                    marginLeft: "-1.3em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 50,
                    cursor: "pointer",
                  }}
                  onClick={() => setMpinInputShow(!mPinInputShow)}
                >
                  {mPinInputShow ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formGridAddress1"></Form.Group>

            <Button
              className="btn btn-warning"
              variant="primary"
              type="submit"
              block
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {otpRequired ? (
        <OtpModal
          modalShow={otpRequired}
          handleModalShow={(event: boolean) => setOtpRequired(event)}
          userOTP={(otp: string) => setOtp(otp)}
          modalFormSubmitHandle={handleLogin}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default Login;
