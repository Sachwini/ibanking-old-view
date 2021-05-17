import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import {
  setBearerToken,
  setRefreshToken,
  setIdentity1,
  setPassword1,
} from "services/AuthService";
import {
  client_id,
  client_secret,
  grant_type,
  DeviceUniqueIdentifier,
} from "services/Constants";
import { useStateValue } from "state-provider/StateProvider";
import axios from "axios";

const Login = (props: RouteComponentProps<{}>) => {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>();

  const [{}, dispatch] = useStateValue();
  let otpRequired = false;

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!identity || !password) return;
    setLoading(true);

    const deviceUniqueIdentifier = DeviceUniqueIdentifier();

    try {
      const url =
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
          otpRequired = true;
          alert("OTP requires");
          setIdentity1(identity);
          setPassword1(password);
          props.history.push("/otp");
        }
      }
    }
  };

  return (
    <Container>
      <Card>
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
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
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
    </Container>
  );
};

export default Login;
