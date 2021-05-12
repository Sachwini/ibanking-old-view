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
import OtpInput from "react-otp-input";
import "./Otp.css"

function Otp(props: RouteComponentProps<{}>) {
  const [OTP, setOTP] = useState("");
  const [otp1, setOtp1] = useState<any>("");
  const [{ }, dispatch] = useStateValue();
  
  const handleOtpChange = (otp: any) => {
    setOtp1(otp) 
  }
  
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
        otp1;

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
    <div className="body1">
      <div className="container">
        <h1>ENTER OTP</h1>
        <div className="userInput">
          <OtpInput
            className="inputStyle"
            value={otp1}
            onChange={handleOtpChange}
            numInputs={6}
          />
        </div>
        <button className="button1" onClick={handleLogin}>
          Submit
        </button>
      </div>
     </div>
  );
}

export default Otp;
