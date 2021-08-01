import { useState } from "react";
import { Card } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { transactionListType } from "models/apiResponse";
import { useForm } from "react-hook-form";
import FundTransferForm from "./FundTransferForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { fundTrasferScheme } from "validation-schema/fundTransfer_validation";
import {
  accountValidation,
  fundTransfer,
  fundTransfer_formData_DefaultValue,
  getDataFor_FundTransferErrorModal,
} from "helper/fun_FundTransfer";
import ConfirmDetailModal from "components/modals/fundTransfer/ConfirmDetailModal";
import MpinModal from "components/modals/MpinModal";
import {
  enableOTPTransction,
  getTransctionHistory,
  isOtpRequired,
} from "helper/common_Functions";
import OTPModal from "components/modals/OTPModal";
import ErrorModal from "components/modals/fundTransfer/ErrorModal";
import {
  fundTransfer_errorModalDataType,
  fundTransfer_errorModalDefaultData,
  tHistoryDefaultData,
} from "models/payment_ModalType";
import SuccessModal from "components/modals/fundTransfer/SuccessModal";
import { fundTransferFormDataType } from "models/for-pages/fundTransferModels";
import { CustomForm } from "styling/common/FormStyling";
import { accValidationDefaultValue } from "models/for-pages/bankTransferModels";

export const FundTransfer = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<fundTransferFormDataType>({
    resolver: yupResolver(fundTrasferScheme),
    mode: "all",
  });

  const [mpin, setMpin] = useState<string>("");
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [successModalShow, setSuccessModalShow] = useState<boolean>(false);
  const [accValidationStatus, setAccValidationStatus] = useState(
    accValidationDefaultValue
  );

  const [formData, setFormData] = useState<fundTransferFormDataType>(
    fundTransfer_formData_DefaultValue
  );
  const [errorModalShow, setErrorModalShow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something Went Wrong Please Try Again Later"
  );
  const [successMessage, setSuccessMessage] = useState(
    "Your Transction is SuccessFully Completed"
  );
  const [dataForErrorModal, setDataForErrorModal] =
    useState<fundTransfer_errorModalDataType>(
      fundTransfer_errorModalDefaultData
    );
  const [tHistoryData, setTHistoryData] =
    useState<transactionListType<any>>(tHistoryDefaultData);

  // call account validation and open detail modal
  const onSubmit = async (data: fundTransferFormDataType) => {
    setFormData(data);
    console.log("fund transfer form data: ", data);

    const validationData = await accountValidation(data);
    if (validationData) {
      setAccValidationStatus(validationData);
    }

    setDataForErrorModal(getDataFor_FundTransferErrorModal(data));

    setDetailModalShow(true);
  };

  const confirmModelSubmitHandle = () => {
    setDetailModalShow(false);

    // Enabling mPin Modal
    setMpinModalShow(true);
  };

  const mpinModalSubmitHandle = async () => {
    setMpinModalShow(false);

    // Validating Is otp is Required
    const res = await isOtpRequired(formData.amount, true);
    if (res && res === true) {
      setOtpRequired(true);
    } else {
      //calling fund transfer api form here
      handleTransfer();
    }
  };

  const otpModalSubmitHandle = async () => {
    await enableOTPTransction(otp);

    // Calling Fund Transfer API
    handleTransfer();

    setOtpRequired(false);
  };

  const resendOTPHandle = async () => {
    // calling OTP Validation
    const isRequired = await isOtpRequired(formData.amount);
    if (isRequired && isRequired === true) {
      return;
    }
  };

  //for handle fund transfer of whole data
  const handleTransfer = async () => {
    try {
      const transfer = await fundTransfer(formData, otpRequired, otp, mpin);
      if (transfer) {
        getTransactionData();
        setSuccessMessage(transfer.message);
        setSuccessModalShow(true);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        setErrorModalShow(true);
      }
    }
  };

  //get first index(latest transaction) of transaction history
  const getTransactionData = async () => {
    const res = await getTransctionHistory(mpin);
    const data = res.transactionList[0];
    setTHistoryData(data);
  };

  return (
    <>
      <Card className="card_Shadow">
        <Card.Body>
          <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <FundTransferForm
              register={register}
              control={control}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
            />
          </CustomForm>
        </Card.Body>
      </Card>

      <ConfirmDetailModal
        confirmModalShow={detailModalShow}
        data={formData}
        accValidationStatus={accValidationStatus}
        confirmModalSubmitHandle={confirmModelSubmitHandle}
        handleCancle={(e) => setDetailModalShow(e)}
      />

      <MpinModal
        setMpin={(mPin: string) => setMpin(mPin)}
        mpinModalShow={mpinModalShow}
        mpinModalSubmitHandle={mpinModalSubmitHandle}
        handleCancle={(event: boolean) => setMpinModalShow(event)}
      />

      <OTPModal
        otpModalShow={otpRequired}
        setOTP={(otp: string) => setOtp(otp)}
        otpModalSubmitHandle={otpModalSubmitHandle}
        resendOTPHandle={resendOTPHandle}
        handleCancle={(event: boolean) => setOtpRequired(event)}
      />

      <SuccessModal
        successModalShow={successModalShow}
        successMessage={successMessage}
        handleCancle={(event: boolean) => setSuccessModalShow(event)}
        mpin={mpin}
        tHistoryData={tHistoryData}
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
