import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoading } from "state-provider/forPageSetting";
import {
  brokerDataType,
  brokerFormPropsType,
} from "models/for-pages/brokerPaymentModels";
import { getBrokerCode, getBrokerList } from "helper/fun_BrokerPayment";
import { getBankAccNo } from "state-provider/globalUserData";
import { v4 as uuidv4 } from "uuid";

const BrokerPaymentForm: React.FC<brokerFormPropsType> = ({
  register,
  errors,
  watch,
  getValues,
  setValue,
  control,
}) => {
  const [brokerData, setBrokerData] = useState<brokerDataType>();
  const setLoading = useSetRecoilState(isLoading);
  const bankAcclist = useRecoilValue(getBankAccNo);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    const init = async () => {
      const res = await getBrokerList();
      if (isSubscribed && res) {
        setBrokerData(res);
        setLoading(false);
      }
    };

    setLoading(false);

    init();
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    const brokerName = getValues("DESTBrokerName");

    if (brokerName && brokerName !== "") {
      const brokerCode = getBrokerCode(brokerName, brokerData?.brokerList);
      if (brokerCode) {
        setValue("brokerCode", brokerCode);
      }
    }
  }, [watch("DESTBrokerName")]);

  return (
    <>
      <Form.Group controlId="fromAccount" className="form_group">
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

      <Form.Group controlId="DESTBrokerName" className="form_group">
        <Form.Label className="font-weight-bold">Select Broker</Form.Label>
        <Controller
          control={control}
          name="DESTBrokerName"
          render={({ field }) => (
            <Typeahead
              id="DESTBrokerName"
              options={brokerData ? brokerData.onlyBrokerNameList : []}
              placeholder="Choose your broker..."
              onChange={(e) => field.onChange(e[0])}
              onBlur={() => field.onBlur()}
              isInvalid={!!errors.DESTBrokerName}
            />
          )}
        />
        <Form.Control.Feedback
          type="invalid"
          className={errors.DESTBrokerName ? "d-block" : ""}
        >
          {errors.DESTBrokerName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="clientID" className="form_group">
        <Form.Label className="font-weight-bold">Client Id</Form.Label>
        <Form.Control
          type="text"
          {...register("clientID")}
          placeholder="Enter your clientId..."
          autoComplete="off"
          isInvalid={!!errors.clientID}
        />
        <Form.Control.Feedback type="invalid">
          {errors.clientID?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="clientName" className="form_group">
        <Form.Label className="font-weight-bold">Client Name</Form.Label>
        <Form.Control
          type="text"
          {...register("clientName")}
          placeholder="Enter your clientName..."
          autoComplete="off"
          isInvalid={!!errors.clientName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.clientName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="mobileNumber" className="form_group">
        <Form.Label className="font-weight-bold">Mobile No.</Form.Label>
        <Form.Control
          type="number"
          {...register("mobileNumber")}
          placeholder="Enter your mobileNumber..."
          autoComplete="off"
          minLength={10}
          isInvalid={!!errors.mobileNumber}
        />
        <Form.Control.Feedback type="invalid">
          {errors.mobileNumber?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="transctionAmount" className="form_group">
        <Form.Label className="font-weight-bold">Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Transction Amount..."
          autoComplete="off"
          {...register("transctionAmount")}
          minLength={3}
          min={100}
          isInvalid={!!errors.transctionAmount}
        />
        <Form.Control.Feedback type="invalid">
          {errors.transctionAmount?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="remarks" className="form_group">
        <Form.Label className="font-weight-bold">Remarks</Form.Label>
        <Form.Control
          type="text"
          {...register("remarks")}
          placeholder="remarks..."
          autoComplete="off"
          isInvalid={!!errors.remarks}
        />
        <Form.Control.Feedback type="invalid">
          {errors.remarks?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="success" type="submit">
        Transfer
      </Button>

      <Button className="ml-5" variant="danger" type="reset">
        Reset
      </Button>
    </>
  );
};

export default BrokerPaymentForm;
