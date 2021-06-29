import { useState } from "react";
import { Card, Form, Image } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { setBearerToken, setRefreshToken } from "services/AuthService";
import axios from "axios";
import { LoginContainer, LoginWrapper } from "styling/login/LoginStyling";
import { MyButton } from "styling/common/ButtonStyling";
import PoweredBySection from "./PoweredBySection";
import RememberMe from "./RememberMe";
import { useForm } from "react-hook-form";
import { loginDetailsType } from "models/for-pages/login_PageModels";
import OTPLoginForm from "./OTPLoginForm";
import LoginForm from "./LoginForm";
import { LoginUrl } from "helper/LoginUrlManage";
import { errorCheck } from "./ResponseErrorHandle";
import { useSetRecoilState } from "recoil";
import { isUserLoggedIN } from "state-provider/globalUserData";
import { loginFormScheme } from "validation-schema/LoginForm_validation";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = (props: RouteComponentProps<{}>) => {
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>("");
  const [isErrorsOccured, setIsErrorsOccured] = useState<boolean>(false);
  const isUserLoggedIn = useSetRecoilState(isUserLoggedIN);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginDetailsType>({
    resolver: yupResolver(loginFormScheme),
    mode: "all",
  });

  //   const fieldValueWatch = watch(["otp", "password", "userName"]);
  //   if (
  //     fieldValueWatch[0] === "" ||
  //     fieldValueWatch[1] === "" ||
  //     fieldValueWatch[2] === ""
  //   ) {
  //     setIsErrorsOccured(false);
  //   }

  const handleLogin = async (formData: loginDetailsType) => {
    const url = LoginUrl({
      userName: formData.userName,
      password: formData.password,
      otp: formData.otp,
      isOTPRequired: otpRequired,
    });

    try {
      const res = await axios(url, {
        method: "POST",
      });
      if (res) {
        setOtpRequired(false);
        setBearerToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        isUserLoggedIn(true);

        props.history.push("/");
        window.location.reload(true);
      } else {
        setOtpRequired(false);

        props.history.push("/login");
        isUserLoggedIn(false);
      }
    } catch (error) {
      setIsErrorsOccured(true);
      errorCheck({
        errorDescriptions: error.response.data.error_description,
        setOTPRequired: (value) => setOtpRequired(value),
        setAPIErrorMessage: (value) => setApiErrorMessage(value),
      });
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <Card style={{ width: "30rem", border: "none" }}>
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
            <Form onSubmit={handleSubmit(handleLogin)}>
              <Form.Group controlId="loginFormError">
                {isErrorsOccured && (
                  <Form.Text className="text-danger text-capitalize">
                    {apiErrorMessage}
                  </Form.Text>
                )}
              </Form.Group>

              {otpRequired ? (
                <OTPLoginForm
                  register={register}
                  errors={errors}
                  isOTPRequired={otpRequired}
                />
              ) : (
                <LoginForm register={register} errors={errors} />
              )}

              <MyButton type="submit" width="100%">
                {otpRequired ? "Submit" : "Login"}
              </MyButton>
            </Form>
          </Card.Body>
        </Card>

        {/* remember me section */}
        <RememberMe />
      </LoginWrapper>

      {/* PoweredBy section */}
      <PoweredBySection />
    </LoginContainer>
  );
};

export default Login;
