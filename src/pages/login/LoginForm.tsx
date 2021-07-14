import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IconStyle } from "styling/common/IconStyling";
import { EyeContainer } from "styling/LoginStyling";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const LoginForm = (props: Props) => {
  // props Initialization
  const { register, errors } = props;

  const [inputFieldValueShow, setInputFieldValueShow] = useState<boolean>(true);

  // handle error display
  const errorDisplay = (error: string) => {
    return (
      <Form.Text className="text-danger font-weight-bold text-capitalize">
        {error}
      </Form.Text>
    );
  };

  return (
    <>
      <Form.Group controlId="username">
        <Form.Label className="font-weight-bold pl-0">User Name</Form.Label>
        <Form.Control
          type="text"
          {...register("userName", { required: true, minLength: 10 })}
          placeholder="Mobile Number or Email..."
        />
        {errors.userName && errorDisplay(errors.userName.message)}
      </Form.Group>

      <Form.Group controlId="password" className="py-2">
        <Form.Label className="font-weight-bold pl-0">Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={`${inputFieldValueShow ? "password" : "text"}`}
            {...register("password", { required: true, minLength: 4 })}
            placeholder="Enter your password..."
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
        {errors.password && errorDisplay(errors.password.message)}
      </Form.Group>
    </>
  );
};

export default LoginForm;
