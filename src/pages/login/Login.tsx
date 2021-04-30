import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { setBearerToken, setRefreshToken } from "services/AuthService";
import {
  client_id,
  client_secret,
  grant_type,
  deviceUniqueIdentifier,
} from "services/Constants";
import { useStateValue } from "state-provider/StateProvider";
import axios from "axios";

const Login = (props: RouteComponentProps<{}>) => {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>();

  const [{ isLogin }, dispatch] = useStateValue();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!identity || !password) return;
    setLoading(true);

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
        props.history.push("/");
        dispatch({
          type: "IS_LOGIN",
          value: true,
        });
      } else props.history.push("/login");
    } catch {
      setLoading(false);
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
                Identity VBMRDWEVFV9840069570
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
                Password 62999
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Form.Group>

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
