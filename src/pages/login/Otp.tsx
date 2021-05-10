import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import {
  client_id,
  client_secret,
  grant_type,
  deviceUniqueIdentifier,
} from "services/Constants";
import axios from "axios";
import { setBearerToken, setRefreshToken,getIdentity1,getPassword1 } from "services/AuthService";
import { RouteComponentProps } from "react-router";
import { useStateValue } from "state-provider/StateProvider";

function Otp(props: RouteComponentProps<{}>) {
  const [OTP, setOTP] = useState("");
  const [{}, dispatch] = useStateValue();
  
  const handleLogin = async (e: any) => {
    e.preventDefault();
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
        getPassword1() +
        "&username=" +
        getIdentity1() + 
        "&otp=" +
        OTP;

      const res = await axios(url, {
        method: "POST",
      });
      if (res) {
        setBearerToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        props.history.push("/");
        dispatch({
          type: "IS_LOGIN",
          value: true,
        });
      } else {
        props.history.push("/login");
        dispatch({
          type: "IS_LOGIN",
          value: false,
        });
      }
    } catch (e) {
      alert("wrong OTP Please login Again")
      props.history.push("/login")
    } finally {
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>OTP verification</Card.Title>
          <hr />
          <Form>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Enter the otp
              </Form.Label>
              <Form.Control
                type="text"
                name="OTP"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="OTP"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Button
              className="btn btn-warning"
              variant="primary"
              type="submit"
              block
              onClick={handleLogin}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Otp;
