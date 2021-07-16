import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { post } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";
import ConfirmDetailModal from "components/modals/bank-transfer/ConfirmDetailModal";
import MpinModal from "components/modals/MpinModal";
import OTPModal from "components/modals/OTPModal";
import ErrorModal from "components/modals/ErrorModal";
import SuccessModal from "components/modals/bank-transfer/SuccessModal";
import { bankTransferFormDataType } from "models/for-pages/bankTransferModels";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankTransferScheme } from "validation-schema/bankTransfer_validation";
import BankTransferForm from "./BankTransferForm";
import { useForm } from "react-hook-form";
import {
  formDataFormat,
  formData_DefaultValue,
  getDataFor_BankTransferErrorModal,
  getTransctionCharge,
  isAccountValid,
} from "helper/fun_BankTransfer";
import { toast } from "react-toastify";
import { enableOTPTransction, isOtpRequired } from "helper/common_Functions";
import { Loader } from "pages/static/Loader";
import {
  errorModalDataType,
  errorModalDefaultData,
} from "models/payment_ModalType";

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

  // const setLoading = useSetRecoilState(isLoading);
  const [loading, setLoading] = useState<boolean>(false);

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
  const [successMessage, setSuccessMessage] = useState(
    "Your Transction is SuccessFully Completed"
  );
  const [errorModalShow, setErrorModalShow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something Went Wrong Please Try Again Later"
  );

  // For OTP Validation And Handle
  const [OTP, setOTP] = useState<string>("");
  const [isOTPRequired, setIsOTPRequired] = useState<boolean>(false);
  const [formData, setFormData] = useState<bankTransferFormDataType>(
    formData_DefaultValue
  );
  const [transctionIdentifier, setTransctionIdentifier] = useState<string>("");
  const [dataForErrorModal, setDataForErrorModal] =
    useState<errorModalDataType>(errorModalDefaultData);
  console.log("mpin :", mpin);

  const onSubmit = async (data: bankTransferFormDataType) => {
    setFormData(data);
    setLoading(true);

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
    }

    setDataForErrorModal(
      getDataFor_BankTransferErrorModal(data, transctionCharge)
    );

    // const confirmModalData =
    setLoading(false);

    setConfirmModalShow(true);
  };

  //-------------Conformation Modal Dialouge Handle---------------------//
  const confirmModelSubmitHandle = () => {
    setConfirmModalShow(false);

    // Enabling mPin Modal
    setMpinModalShow(true);
  };

  //-------------Handle Mpin Form Modal---------------------//
  const mpinModalSubmitHandle = async () => {
    setMpinModalShow(false);

    // Validating Is otp is Required
    const res = await isOtpRequired(formData.transctionAmount, true);
    if (res && res === true) {
      setIsOTPRequired(true);
    } else {
      //calling fund transfer api form here
      fundTransferAPI();
    }
  };

  //-------------otpModalSubmitHandle Modal---------------------//
  const otpModalSubmitHandle = async () => {
    // Enabling OTP Required at Transction Time True
    await enableOTPTransction(OTP);

    setIsOTPRequired(false);
    // Calling Fund Transfer API
    fundTransferAPI();
  };

  const resendOTPHandle = async () => {
    // calling OTP Validation
    const isRequired = await isOtpRequired(formData.transctionAmount);
    if (isRequired && isRequired === true) {
      return;
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
        setSuccessMessage(bankTransfer.data.details);
        setTransctionIdentifier(bankTransfer.data.detail.transactionIdentifier);
        console.log("Bank transfer success response: ", bankTransfer.data);
        setSuccessModalShow(true);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        console.log("bank transfer error: ", error.response.data);
        setErrorModalShow(true);
      }
    }
  };

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
        data={formData}
        transctionCharge={transctionCharge}
        accValidationStatus={accValidationStatus}
        confirmModalSubmitHandle={confirmModelSubmitHandle}
        handleCancle={(e) => setConfirmModalShow(e)}
      />

      <MpinModal
        setMpin={(value) => setMpin(value)}
        mpinModalShow={mPinModalShow}
        mpinModalSubmitHandle={mpinModalSubmitHandle}
        handleCancle={(event: boolean) => setMpinModalShow(event)}
      />

      <OTPModal
        otpModalShow={isOTPRequired}
        setOTP={(otp) => setOTP(otp)}
        otpModalSubmitHandle={otpModalSubmitHandle}
        resendOTPHandle={resendOTPHandle}
        handleCancle={(event: boolean) => setIsOTPRequired(event)}
      />

      <SuccessModal
        mpin={mpin}
        successModalShow={successModalShow}
        successMessage={successMessage}
        transctionIdentifier={transctionIdentifier}
        handleCancle={(event: boolean) => setSuccessModalShow(event)}
      />

      <ErrorModal
        errorModalShow={errorModalShow}
        errorMessage={errorMessage}
        errorInfoData={dataForErrorModal}
        handleCancle={(event: boolean) => setErrorModalShow(event)}
      />
    </>
  );
};
