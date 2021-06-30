import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";
import ConfirmDetailModal from "components/modals/bank-transfer/ConfirmDetailModal";
import MpinModal from "components/modals/bank-transfer/MpinModal";
import OTPModal from "components/modals/bank-transfer/OTPModal";
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
    setLoading(true);
    setFormData(data);

    // getting transction charges
    const transctionCharges = await getTransctionCharge(
      data.transctionAmount,
      DESTBankID
    );
    if (transctionCharges) {
      setTransctionCharge(transctionCharges);
      // setValue("transctionCharge", transctionCharges);
    }

    // checking is account credentials is valid
    try {
      const isValid = await isAccountValid(data);
      setLoading(true);
      if (
        isValid &&
        isValid.status === "valid" &&
        isValid.matchPercentage === 100
      ) {
        // Calling Conformation Modal Dialogue
        setConfirmModalShow(true);
      } else {
        setLoading(false);
        toast.error(isValid.message, {
          autoClose: 12000,
        });
      }
    } catch (error: any) {
      if (error.response) {
        // setConfirmModalShow(true);
        setLoading(false);
        toast.error(error.response.data.detail.message, {
          autoClose: 12000,
        });
      }
      return;
    }
  };

  //-------------Conformation Modal Dialouge Handle---------------------//
  const confirmModelSubmitHandle = () => {
    setConfirmModalShow(!confirmModalShow);
    // Enabling mPin Modal
    setMpinModalShow(true);
  };

  //-------------Handle Mpin Form Modal---------------------//
  const mPinFormSubmitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    // Enabling Mpin Modal Show
    setMpinModalShow(!mPinModalShow);
    // Validating Is otp is Required
    isOtpRequired();
  };

  //-------------OTPFormHandle Modal---------------------//
  const OTPFormHandle = (e: React.FormEvent) => {
    e.preventDefault();
    // Enabling OTP Modal Show
    setOTPModalShow(!OTPModalShow);
    //Enabling OTP Require At Transction
    enableOTPTransction();
  };

  // ReSend OTP Handle
  const resendOTPHandle = async () => {
    // calling OTP Validation
    const isRequired = await get<apiResponse<any>>(
      `api/otp/request?serviceInfoType=CONNECT_IPS&amount=${formData?.transctionAmount}`
    );
    if (isRequired && isRequired.data.detail.otpRequired === true) {
      const res = await post<apiResponse<any>>(
        `api/changeBankTransferOtpStatus?status=true&otp=${OTP}`,
        {}
      );
      if (res) {
        toast.success(res.data.message);
      }
    }
    return;
  };

  // Validating This Transction is required OTP or Not?
  const isOtpRequired = async () => {
    const res = await get<apiResponse<any>>(
      `api/otp/request?serviceInfoType=CONNECT_IPS&amount=${formData?.transctionAmount}`
    );
    if (res && res.data.detail.otpRequired === true) {
      SetIsOTPRequired(true);
      setOTPResponse({ status: "success", message: res.data.message });

      // To Enabling OTP required at Transction
      setOTPModalShow(true);
    } else {
      // calling fund transfer api form here
      fundTransferAPI();
    }
  };

  // Enabling OTP Required at Transction Time True
  const enableOTPTransction = async () => {
    try {
      const res = await post<apiResponse<any>>(
        `api/changeBankTransferOtpStatus?status=true&otp=${OTP}`,
        {}
      );
      if (res) {
        // Calling Fund Transfer API
        fundTransferAPI();
      }
    } catch (error: any) {
      if (
        error.response.data.status === "FAILURE" &&
        error.response.data.status.message ===
          "OTP Expired Please Request a New One"
      ) {
        resendOTPHandle();
        setOTPResponse({
          status: "failed",
          message:
            "OTP Expire!!! New OTP is send to your Phone. Please Enter New One...",
        });
        setOTPModalShow(true);
      } else if (error.response.data.status === "FAILURE") {
        setOTPResponse({
          status: "failed",
          message: error.response.data.message,
        });
        setOTPModalShow(true);
      }
    }
  };

  // Fund Transfer API
  const fundTransferAPI = async () => {
    setLoading(true);

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
        // console.log("tansfer response : ", bankTransfer.data);
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
    setLoading(false);
  };

  const resetClicked = () => {
    reset({
      fromAccount: "",
      DESTBankName: "",
      DESTBankID: "",
      toAccount: "",
      destAccountHolderName: "",
      DESTBranchName: "",
      DESTBranchID: "",
      transctionAmount: "",
      remarks: "",
    });
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
              destBankId={(id) => setDESTBankID(id)}
              destBranchId={(id) => setDESTBranchID(id)}
            />
            <Button variant="success" type="submit">
              Submit
            </Button>

            <Button className="ml-5" variant="danger" onClick={resetClicked}>
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Form modals controlling is going from here going here  */}
      <MpinModal
        userMpin={(mPin: string) => setMpin(mPin)}
        mPinModalShow={mPinModalShow}
        mPinFormSubmitHandle={(e) => mPinFormSubmitHandle(e)}
        cancleButton={(event: boolean) => setMpinModalShow(event)}
      />

      <ConfirmDetailModal
        data={formData}
        transctionCharge={transctionCharge}
        confirmModalShow={confirmModalShow}
        confirmModalShowHandle={(e) => {
          setConfirmModalShow(e);
          confirmModelSubmitHandle();
        }}
        confirmModalCancleButton={(e) => setConfirmModalShow(e)}
      />

      <OTPModal
        userOTP={(otp) => setOTP(otp)}
        OTPModalShow={OTPModalShow}
        OTPResponse={OTPResponse}
        OTPFormHandle={(e) => OTPFormHandle(e)}
        resendOTPHandle={() => resendOTPHandle()}
        cancleButton={(event: boolean) => setOTPModalShow(event)}
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
