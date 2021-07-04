import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiResponse } from "models/apiResponse";
import DetailModal from "components/modals/fundTransfer/DetailModal";
import MpinModal from "components/modals/fundTransfer/MpinModal";
import OtpModal from "components/modals/fundTransfer/OtpModal";
import SuccessModal from "components/modals/fundTransfer/SuccessModal";
import { useForm } from "react-hook-form";
import { fundTransferFormDataType } from "./model";
import FundTransferForm from "./FundTransferForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { fundTrasferScheme } from "validation-schema/fundTransfer_validation";
import { useRecoilValue } from "recoil";
import { isLoading } from "state-provider/forPageSetting";

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

  const [DESTBranchID, setDESTBranchID] = useState<string>("null");
  const [mpin, setMpin] = useState<string>("");
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [validAccount, setValidAccount] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });
  const [
    accountValidationResponseMessage,
    setAccountValidationResponseMessage,
  ] = useState({
    message: "",
    matchPercentage: "",
  });

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
        setAccountValidationResponseMessage({
          message: res.data.detail.message,
          matchPercentage: res.data.detail.matchPercentage,
        });
        return res && setValidAccount(true);
      }
    } catch (error) {
      setValidAccount(false);
      setAccountValidationResponseMessage({
        message: error.response.data.detail.message,
        matchPercentage: error.response.data.detail.matchPercentage,
      });
    }
  };

  //for request Otp
  const requestOtp = async () => {
    const req = await get<apiResponse<any>>(
      "api/otp/request?serviceInfoType=CONNECT_IPS&associatedId&amount=" +
        getValues("amount")
    );
  };
  const openDetailModel = () => {
    setDetailModalShow(true);
  };

  const handleSubmit1 = async (e: any) => {
    e.preventDefault();
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
    if (parseFloat(getValues("amount")) > 5000) {
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
        setIsSuccessMessage(true);
        setResponseMessage({
          status: "success",
          message: res.data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error");
        setIsSuccessMessage(true);
        setResponseMessage({
          status: "failure",
          message: error.response.data.message,
        });
        console.log("ERROR message", error.response.data.message);
      }
    }
  };

  const handleOtpRequired = (e: any) => {
    e.preventDefault();
    if (parseFloat(getValues("amount")) <= 5000) {
      {
        {
          setOtpRequired(false);
          handleSubmit1(e);
        }
      }
    } else if (parseFloat(getValues("amount")) > 5000) {
      setOtpRequired(true);
      requestOtp();
    }
  };

  const changeOtpStatus = async (e: any) => {
    e.preventDefault();
    try {
      const res = await post<any>(
        "api/changeBankTransferOtpStatus?status=true&otp=" + otp,
        {}
      );
      if (res) {
        handleSubmit1(e);
      }
    } catch (error) {
      toast.error("catch inside changeOTP", error.response.data.message);
    }
  };

  const onSubmit = async (data: fundTransferFormDataType) => {
    console.log("form data: ", data);
    accountValidation();
    openDetailModel();
  };

  const handleReset = () => {
    reset({
      fromAccount: "",
      DESTBranchName: "",
      toAccount: "",
      destinationAccountHolderName: "",
      DESTBranchID: "",
      amount: "",
    });
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
              destBranchId={(id) => setDESTBranchID(id)}
            />

            <Button variant="success" type="submit">
              Submit
            </Button>

            <Button className="ml-5" variant="danger" onClick={handleReset}>
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <DetailModal
        modalShow={detailModalShow}
        handleModalShow={(event: boolean) => setDetailModalShow(event)}
        modalFormSubmitHandle={(event: boolean) => setMpinModalShow(true)}
        fromAccount={getValues("fromAccount")}
        toAccount={getValues("toAccount")}
        destinationAccountHolderName={getValues("destinationAccountHolderName")}
        branch={getValues("DESTBranchName")}
        amount={getValues("amount")}
        validAccount={validAccount}
        accountValidationResponseMessage={accountValidationResponseMessage}
        confirmModalCancleButton={(event: boolean) => setDetailModalShow(event)}
      />
      <MpinModal
        modalShow={mpinModalShow}
        handleModalShow={(event: boolean) => setMpinModalShow(event)}
        mpin={(mpin: string) => setMpin(mpin)}
        modalFormSubmitHandle={handleOtpRequired}
        cancleButton={(event: boolean) => setMpinModalShow(event)}
      />
      <OtpModal
        modalShow={otpRequired}
        handleModalShow={(event: boolean) => setOtpRequired(event)}
        userOTP={(otp: string) => setOtp(otp)}
        modalFormSubmitHandle={changeOtpStatus}
        resendOtp={() => requestOtp()}
        cancleButton={(event: boolean) => setOtpRequired(event)}
      />
      <SuccessModal
        successModalShow={isSuccessMessage}
        handleModalShow={(e) => setIsSuccessMessage(e)}
        fromAccount={getValues("fromAccount")}
        branch={getValues("DESTBranchName")}
        toAccount={getValues("toAccount")}
        destinationAccountHolderName={getValues("destinationAccountHolderName")}
        amount={getValues("amount")}
        responseMessage={responseMessage}
        mpin={mpin}
      />
    </>
  );
};
