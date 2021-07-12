import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { transactionListType } from "models/apiResponse";
import { useForm } from "react-hook-form";
import { fundTransferFormDataType } from "./model";
import FundTransferForm from "./FundTransferForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { fundTrasferScheme } from "validation-schema/fundTransfer_validation";
import { useRecoilValue } from "recoil";
import { isLoading } from "state-provider/forPageSetting";
import {
  fundTransfer_formData_DefaultValue,
  fundTransfer_getDataForErrorModal,
  getTransctionHistory,
} from "helper/GetData";
import ConfirmDetailModal from "components/modals/fundTransfer/ConfirmDetailModal";
import MpinModal from "components/modals/MpinModal";
import { enableOTPTransction, isOtpRequired } from "helper/common_Functions";
import OTPModal from "components/modals/OTPModal";
import ErrorModal from "components/modals/fundTransfer/ErrorModal";
import {
  fundTransfer_errorModalDataType,
  fundTransfer_errorModalDefaultData,
  tHistoryDefaultData,
} from "models/payment_ModalType";
import SuccessModal from "components/modals/fundTransfer/SuccessModal";

export const FundTransfer = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<fundTransferFormDataType>({
    resolver: yupResolver(fundTrasferScheme),
    mode: "all",
  });

  const setLoading = useRecoilValue(isLoading);

  const [mpin, setMpin] = useState<string>("");
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [isError_inOTPResponse, setIsError_inOTPResponse] = useState({
    isError: false as boolean,
    message: "",
  });
  const [successModalShow, setSuccessModalShow] = useState<boolean>(false);
  const [accValidationStatus, setAccValidationStatus] = useState({
    status: true as boolean,
    message: "" as string,
  });

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
    useState<transactionListType>(tHistoryDefaultData);

  //For account Validation
  const accountValidation = async () => {
    try {
      if (
        getValues("toAccount") !== "" &&
        getValues("destinationAccountHolderName") !== "" &&
        getValues("DESTBranchID") !== ""
      ) {
        const res = await get<any>(
          "api/account/validation?destinationAccountNumber=" +
            getValues("toAccount") +
            "&destinationAccountName=" +
            getValues("destinationAccountHolderName") +
            "&destinationBranchId=" +
            getValues("DESTBranchID")
        );
        setAccValidationStatus({
          status: true,
          message: res.data.detail.message,
        });
      }
    } catch (error) {
      setAccValidationStatus({
        status: false,
        message: error.response.data.detail.message,
      });
    }
  };

  //open Detail
  const openDetailModel = () => {
    setDetailModalShow(true);
  };

  //for handle fund transfer of whole data
  const handleTransfer = async () => {
    if (
      !getValues("fromAccount") ||
      !getValues("toAccount") ||
      !getValues("DESTBranchID") ||
      !getValues("amount") ||
      !mpin
    ) {
      toast.error("Incomplete field");
      return;
    }

    let url = "";
    if (otpRequired) {
      url =
        "api/fundtransfer?from_account_number=" +
        getValues("fromAccount") +
        "&to_account_number=" +
        getValues("toAccount") +
        "&bank_branch_id=" +
        getValues("DESTBranchID") +
        "&amount=" +
        getValues("amount") +
        "&mPin=" +
        mpin +
        "&otp=" +
        otp;
    } else {
      url =
        "api/fundtransfer?from_account_number=" +
        getValues("fromAccount") +
        "&to_account_number=" +
        getValues("toAccount") +
        "&bank_branch_id=" +
        getValues("DESTBranchID") +
        "&amount=" +
        getValues("amount") +
        "&mPin=" +
        mpin;
    }
    try {
      const res = await post<any>(url, "");
      if (res) {
        getTransactionData();
        setSuccessMessage(res.data.message);
        setSuccessModalShow(true);
      }
    } catch (error) {
      if (error.response) {
        setSuccessMessage(error.response.data.message);
        setErrorMessage(error.response.data.message);
        setErrorModalShow(true);
      }
    }
  };

  //-------------Handle Mpin Form Modal---------------------//
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
    // Enabling OTP Required at Transction Time True
    const isEnabled = await enableOTPTransction(otp);
    if (isEnabled && isEnabled.status === true) {
    } else {
      setIsError_inOTPResponse({
        isError: true,
        message: isEnabled ? isEnabled.message : "",
      });
    }
    setOtpRequired(false);

    // Calling Fund Transfer API
    handleTransfer();
  };

  const resendOTPHandle = async () => {
    // calling OTP Validation
    const isRequired = await isOtpRequired(formData.amount);
    if (isRequired && isRequired === true) {
      return;
    }
  };

  //get first index(latest transaction) of transaction history
  const getTransactionData = async () => {
    const res = await getTransctionHistory(mpin);
    const data = res.transactionList[0];
    setTHistoryData(data);
  };

  // call account validation and open detail modal
  const onSubmit = async (data: fundTransferFormDataType) => {
    setFormData(data);
    setDataForErrorModal(fundTransfer_getDataForErrorModal(data));
    accountValidation();
    openDetailModel();
  };

  //after detail modal shown
  const confirmModelSubmitHandle = () => {
    setDetailModalShow(false);

    // Enabling mPin Modal
    setMpinModalShow(true);
  };

  return (
    <>
      <Card className="card_Shadow">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FundTransferForm
              register={register}
              control={control}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              reset={reset}
            />
          </Form>
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
