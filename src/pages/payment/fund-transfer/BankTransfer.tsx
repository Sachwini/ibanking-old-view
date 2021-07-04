import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { post } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";
import ConfirmDetailModal from "components/modals/bank-transfer/ConfirmDetailModal";
import MpinModal from "components/modals/bank-transfer/MpinModal";
import OTPModal from "components/modals/OTPModal";
import SuccessModal from "components/modals/bank-transfer/SuccessModal";
import { bankTransferFormDataType } from "models/for-pages/bankTransfer_models";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankTransferScheme } from "validation-schema/bankTransfer_validation";
import BankTransferForm from "./BankTransferForm";
import { useForm } from "react-hook-form";
import {
  formDataFormat,
  getTransctionCharge,
  isAccountValid,
} from "helper/GetData";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { isLoading } from "state-provider/forPageSetting";
import { enableOTPTransction, isOtpRequired } from "helper/common_Functions";

export const BankTransfer = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<bankTransferFormDataType>({
    resolver: yupResolver(bankTransferScheme),
    mode: "all",
  });

  const setLoading = useSetRecoilState(isLoading);

  // For Bank Handle
  const [DESTBankID, setDESTBankID] = useState<string>("");
  const [DESTBranchID, setDESTBranchID] = useState<string>("null");
  const [transctionCharge, setTransctionCharge] = useState<string>("");

  // For modal handles
  const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);
  const [accValidationStatus, setAccValidationStatus] = useState({
    status: true as boolean,
    message: "" as string,
  });
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
  const [isError_inOTPResponse, setIsError_inOTPResponse] = useState({
    isError: false as boolean,
    message: "",
  });
  const [formData, setFormData] = useState<bankTransferFormDataType>({
    fromAccount: "",
    toAccount: "",
    DESTBankName: "",
    DESTBankID: "null",
    DESTBranchName: "",
    DESTBranchID: "null",
    destAccountHolderName: "",
    transctionAmount: "",
    remarks: "",
  });

  const onSubmit = async (data: bankTransferFormDataType) => {
    setFormData(data);

    // getting transction charges
    const transctionCharges = await getTransctionCharge(
      data.transctionAmount,
      DESTBankID
    );
    if (transctionCharges) {
      setTransctionCharge(transctionCharges);
    }

    // checking is account credentials is valid
    try {
      const isValid = await isAccountValid(data);
      if (
        isValid &&
        isValid.status === "valid" &&
        isValid.matchPercentage === 100
      ) {
        setAccValidationStatus({
          status: true,
          message: isValid.message,
        });
      } else {
        setAccValidationStatus({
          status: false,
          message: isValid.message,
        });
        toast.error(isValid.message, {
          autoClose: 12000,
        });
      }
    } catch (error: any) {
      if (error.response) {
        setAccValidationStatus({
          status: false,
          message: `${error.response.data.detail.message}`,
        });
        toast.error(error.response.data.detail.message, {
          autoClose: 12000,
        });
      }
      return;
    }

    setConfirmModalShow(true);
  };

  //-------------Conformation Modal Dialouge Handle---------------------//
  const confirmModelSubmitHandle = () => {
    setConfirmModalShow(false);
    // Enabling mPin Modal
    setMpinModalShow(true);
  };

  //-------------Handle Mpin Form Modal---------------------//
  const mPinFormSubmitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    // Enabling Mpin Modal Show
    setMpinModalShow(!mPinModalShow);
    // Validating Is otp is Required
    checkingIsOTPRequired();
  };

  //-------------OTPFormHandle Modal---------------------//
  const OTPFormHandle = () => {
    // Enabling OTP Modal Show
    setOTPModalShow(!OTPModalShow);

    //Enabling OTP Require At Transction
    enableOtpTransction();
  };

  const resendOTPHandle = async () => {
    // calling OTP Validation
    const isRequired = await isOtpRequired(formData.transctionAmount);
    if (isRequired && isRequired === true) {
      return;
    }
  };

  // Validating This Transction is required OTP or Not?
  const checkingIsOTPRequired = async () => {
    const res = await isOtpRequired(formData.transctionAmount, true);
    if (res && res === true) {
      SetIsOTPRequired(true);
    } else {
      //calling fund transfer api form here
      fundTransferAPI();
    }
  };

  // Enabling OTP Required at Transction Time True
  const enableOtpTransction = async () => {
    const res = await enableOTPTransction(OTP);
    if (res && res.status === "SUCCCESS") {
      // Calling Fund Transfer API
      fundTransferAPI();
    } else {
      setIsError_inOTPResponse({
        isError: true,
        message: res.message,
      });
    }
  };

  // Fund Transfer API
  const fundTransferAPI = async () => {
    const data = formDataFormat({
      data: formData,
      isOTPRequired: isOTPRequired,
      transctionCharge: transctionCharge,
      OTP: OTP,
      mPin: mpin,
    });

    try {
      //Transfer API fetching start from here
      const bankTransfer = await post<apiResponse<any>>(
        "api/ips/transfer",
        data
      );
      if (bankTransfer) {
        setFundTransferResponse({
          status: "success",
          message: bankTransfer.data.details,
        });
      }
    } catch (error) {
      if (error.response) {
        setFundTransferResponse({
          status: "failed",
          message: error.response.data.message,
        });
        setSuccessModalShow(true);
      }
    }
    // calling Fund Transfer Response Modal
    setSuccessModalShow(true);
  };

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
              reset={reset}
              destBankId={(id) => setDESTBankID(id)}
              destBranchId={(id) => setDESTBranchID(id)}
            />
          </Form>
        </Card.Body>
      </Card>

      {/* Form modals controlling is going from here going here  */}
      <ConfirmDetailModal
        confirmModalShow={confirmModalShow}
        confirmModalSubmitHandle={() => confirmModelSubmitHandle}
        handleCancle={(e) => setConfirmModalShow(e)}
        data={formData}
        transctionCharge={transctionCharge}
        accValidationStatus={accValidationStatus}
      />

      <MpinModal
        userMpin={(mPin: string) => setMpin(mPin)}
        mPinModalShow={mPinModalShow}
        mPinFormSubmitHandle={(e) => mPinFormSubmitHandle(e)}
        cancleButton={(event: boolean) => setMpinModalShow(event)}
      />

      <OTPModal
        setOTP={(otp) => setOTP(otp)}
        otpModalShow={OTPModalShow}
        isErrorInOTPResponse={isError_inOTPResponse}
        otpModalSubmitHandle={() => OTPFormHandle()}
        resendOTPHandle={() => resendOTPHandle()}
        handleCancle={(event: boolean) => setOTPModalShow(event)}
      />

      <SuccessModal
        successModalShow={successModalShow}
        bankTransferResponse={fundTransferResponse}
        successModalShowHandle={(e) => setSuccessModalShow(e)}
        data={formData}
        transctionCharge={transctionCharge}
        mpin={mpin}
      />
    </>
  );
};
