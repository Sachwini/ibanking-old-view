import { Form } from "react-bootstrap";

interface Props {
  setOTPRequired: (value: boolean) => void;
  setAPIErrorMessage: (error: string) => void;
  errorDescriptions: string;
}
export const errorCheck = (props: Props) => {
  // initialization props
  const { setOTPRequired, setAPIErrorMessage, errorDescriptions } = props;

  const maxLogin = "Maximum login attempt reached. User has been blocked.";
  const maxLogin1 = "User account is locked";
  const otpRequiredMsg =
    "unauthorized device. You are Logged In from another Device. If you want to Logout from that device, please verify entering OTP sent to your registered Mobile Number or registered Email.";
  const otpRequiredMsg1 =
    "unauthorized device. We have sent an numeric verification code to your registered mobile number by sms. Kindly authenticate with the received code.";
  const otpExpire = "OTP expired. Please Request a new One.";

  if (errorDescriptions === maxLogin) {
    setAPIErrorMessage(
      `${errorDescriptions} Please Contact Your Nearest Bank Branch`
    );
  } else if (errorDescriptions === maxLogin1) {
    setAPIErrorMessage(
      `${errorDescriptions} Please Contact Your Nearest Bank Branch`
    );
  } else if (errorDescriptions === otpRequiredMsg) {
    setAPIErrorMessage(
      "You are Logged In from another Device. If you want to Logout from that device, please verify entering OTP sent to your registered Mobile Number or registered Email."
    );
    setOTPRequired(true);
  } else if (errorDescriptions === otpRequiredMsg1) {
    setAPIErrorMessage(
      "We have sent an numeric verification code to your registered mobile number by sms. Kindly authenticate with the received code."
    );
    setOTPRequired(true);
  } else if (errorDescriptions === otpExpire) {
    setOTPRequired(true);
  } else setAPIErrorMessage(errorDescriptions);
};

export const errorDisplay = (error: string) => {
  return (
    <Form.Text className="text-danger font-weight-bold text-capitalize">
      {error}
    </Form.Text>
  );
};
