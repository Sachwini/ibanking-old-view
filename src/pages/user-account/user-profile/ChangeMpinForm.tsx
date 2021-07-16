import { changeMpinErrorType } from "models/for-pages/userAccountModels";
import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FieldErrors, UseFormRegister, UseFormReset } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IconStyle } from "styling/common/IconStyling";
import { EyeContainer } from "styling/LoginStyling";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  reset: UseFormReset<any>;
  errorResponse: changeMpinErrorType;
}

function ChangeMpinForm(props: Props) {
  const { register, errors, errorResponse, reset } = props;
  const [inputFieldValueShow, setInputFieldValueShow] = useState<boolean>(true);
  const [inputFieldValueShow2, setInputFieldValueShow2] =
    useState<boolean>(true);
  const [inputFieldValueShow3, setInputFieldValueShow3] =
    useState<boolean>(true);

  const handleReset = (e: any) => {
    reset({
      currentMpin: "",
      newMpin: "",
      confirmMpin: "",
      errorResponse: "",
    });
  };

  const errorDisplay = (error: string) => {
    return (
      <Form.Text className="text-danger font-weight-bold text-capitalize">
        {error}
      </Form.Text>
    );
  };

  return (
    <>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="font-weight-bold">Current mpin</Form.Label>
        <InputGroup>
          <Form.Control
            type={`${inputFieldValueShow ? "password" : "text"}`}
            placeholder="current mpin"
            {...register("currentMpin", { required: true })}
            // isInvalid={!!errors.currentMpin}
            autoComplete="off"
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
        {errors.currentMpin && errorDisplay(errors.currentMpin.message)}
        {errorResponse?.oldPassword ? (
          <Form.Text className="text-danger">
            {errorResponse?.oldPassword}
          </Form.Text>
        ) : (
          ""
        )}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label className="font-weight-bold">New mpin</Form.Label>
        <InputGroup>
          <Form.Control
            type={`${inputFieldValueShow2 ? "password" : "text"}`}
            placeholder="new mpin"
            {...register("newMpin", { required: true, minLength: 4 })}
            // isInvalid={!!errors.newMpin}
            autoComplete="off"
          />
          <EyeContainer
            onClick={() => setInputFieldValueShow2(!inputFieldValueShow2)}
          >
            {inputFieldValueShow2 ? (
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
        {errors.newMpin && errorDisplay(errors.newMpin.message)}
        {errorResponse?.password ? (
          <Form.Text className="text-danger">
            {errorResponse?.password}
          </Form.Text>
        ) : (
          ""
        )}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label className="font-weight-bold">Confirm mpin</Form.Label>
        <InputGroup>
          <Form.Control
            type={`${inputFieldValueShow3 ? "password" : "text"}`}
            placeholder="confirm mpin"
            {...register("confirmMpin", { required: true, minLength: 4 })}
            // isInvalid={!!errors.confirmMpin}
            autoComplete="off"
          />
          <EyeContainer
            onClick={() => setInputFieldValueShow3(!inputFieldValueShow3)}
          >
            {inputFieldValueShow3 ? (
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
        {errors.confirmMpin && errorDisplay(errors.confirmMpin.message)}
        {errorResponse?.repassword ? (
          <Form.Text className="text-danger">
            {errorResponse?.repassword}
          </Form.Text>
        ) : (
          ""
        )}
      </Form.Group>

      <Button variant="success" type="submit">
        Submit
      </Button>

      <Button
        className="ml-5"
        variant="danger"
        type="reset"
        onClick={handleReset}
      >
        Reset
      </Button>
    </>
  );
}

export default ChangeMpinForm;
