import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IconStyle } from "styling/common/IconStyling";
import { EyeContainer } from "styling/LoginStyling";
import { errorDisplay } from "./ResponseErrorHandle";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isOTPRequired: boolean;
}

const OTPLoginForm = (props: Props) => {
  // props Initialization
  const { register, errors, isOTPRequired } = props;

  const [inputFieldValueShow, setInputFieldValueShow] = useState<boolean>(true);

  return (
    <Form.Group controlId="OTPField">
      <Form.Label className="font-weight-bold pl-0">Provide OTP</Form.Label>
      <InputGroup>
        <Form.Control
          type={`${inputFieldValueShow ? "password" : "text"}`}
          {...register("otp", { required: isOTPRequired, minLength: 4 })}
          placeholder="please provide OTP here..."
        />
        <EyeContainer
          onClick={() => setInputFieldValueShow(!inputFieldValueShow)}
        >
          {inputFieldValueShow ? (
            <IconStyle hover>
              <AiOutlineEyeInvisible size={18} />
            </IconStyle>
          ) : (
            <IconStyle hover>
              <AiOutlineEye size={18} />
            </IconStyle>
          )}
        </EyeContainer>
      </InputGroup>
      {errors.otp === "required"
        ? errorDisplay("otp is required")
        : errorDisplay("otp must be minimum 4 digits")}
    </Form.Group>
  );
};

export default OTPLoginForm;
