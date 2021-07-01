import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { useRecoilValue } from "recoil";
import { getBankAccNo } from "state-provider/globalUserData";
import { useStateValue } from "state-provider/StateProvider";
import { UseFormReset } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  control: Control<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
}

function LoadWalletForm(props: Props) {
  const { register, errors, watch, getValues, setValue, control } = props;
  const bankAcclist = useRecoilValue(getBankAccNo);
  const [{ walletDetails }] = useStateValue();

  return (
    <>
      <Form.Group controlId="fromAccount">
        <Form.Label className="font-weight-bold">From Account</Form.Label>
        <Form.Control
          as="select"
          {...register("fromAccount")}
          isInvalid={!!errors.fromAccount}
        >
          {bankAcclist?.map((Acc) => {
            return (
              <option value={Acc.accNo} key={uuidv4()}>
                {Acc.mainCode}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.fromAccount?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="form-row">
        <div className="col">
          <Form.Group controlId="formGridAddress1">
            <Form.Label className="font-weight-bold">
              {walletDetails?.descOneFieldName}
            </Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder={`Enter your registered ${walletDetails?.name} userId`}
              {...register("contact")}
              isInvalid={!!errors.contact}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contact?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>

      <Form.Group controlId="formGridAddress1">
        <Form.Label className="font-weight-bold">Amount</Form.Label>
        <Form.Control
          type="number"
          autoComplete="off"
          placeholder="Amount"
          {...register("amount")}
          isInvalid={!!errors.amount}
        />
        <Form.Control.Feedback type="invalid">
          {errors.amount?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGridAddress1">
        <Form.Label className="font-weight-bold">
          {walletDetails?.descTwoFieldName}
        </Form.Label>
        <Form.Control
          type="text"
          autoComplete="off"
          placeholder="remarks..."
          {...register("remarks")}
          isInvalid={!!errors.remarks}
        />
        <Form.Control.Feedback type="invalid">
          {errors.remarks?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="success" type="submit">
        Submit
      </Button>

      <Button className="ml-5" variant="danger" type="reset">
        Reset
      </Button>
    </>
  );
}

export default LoadWalletForm;
