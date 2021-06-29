import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";
import { Loader } from "pages/static/Loader";
import ConfirmDetailModal from "components/modals/bank-transfer/ConfirmDetailModal";
import MpinModal from "components/modals/bank-transfer/MpinModal";
import OTPModal from "components/modals/bank-transfer/OTPModal";
import SuccessModal from "components/modals/bank-transfer/SuccessModal";
import { bankTransferFormDataType } from "./model";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankTransferScheme } from "validation-schema/bankTransfer_validation";
import BankTransferForm from "./BankTransferForm";
import { useForm } from "react-hook-form";
import { getTransctionCharge, isAccountValid } from "helper/GetData";

export const BankTransfer = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<bankTransferFormDataType>({
    resolver: yupResolver(bankTransferScheme),
    mode: "all",
  });

  // For Bank Handle
  const [DESTBankID, setDESTBankID] = useState<string>("");

  // For Branch Handle
  const [DESTBranchID, setDESTBranchID] = useState<string>("null");
  const [transctionCharge, setTransctionCharge] = useState<string>("");

  // For modal handles
  const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);
  const [mpin, setMpin] = useState<string>("");
  const [mPinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [successModalShow, setSuccessModalShow] = useState<boolean>(false);
  const [fundTransferResponse, setFundTransferResponse] = useState({
    status: "",
    message: "",
  });

  // For OTP Validation And Handle
  const [OTP, setOTP] = useState<string>("");
  const [OTPModalShow, setOTPModalShow] = useState<boolean>(false);
  const [isOTPRequired, SetIsOTPRequired] = useState<boolean>(false);
  const [OTPResponse, setOTPResponse] = useState({ status: "", message: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: bankTransferFormDataType) => {
    console.log("form data: ", data);

    // getting transction charges
    const transctionCharges = await getTransctionCharge(
      data.transctionAmount,
      DESTBankID
    );
    if (transctionCharges) {
      setTransctionCharge(transctionCharges);
    }

    // checking is account credentials is valid
    const isValid = await isAccountValid(data);
    console.log("account validation check : ", isValid);
  };

  console.log("dest bank id: ", DESTBankID);
  console.log("dest bank branch id: ", DESTBranchID);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Card className="card_Shadow">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <BankTransferForm
              register={register}
              control={control}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              destBankId={(id) => setDESTBankID(id)}
              destBranchId={(id) => setDESTBranchID(id)}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
