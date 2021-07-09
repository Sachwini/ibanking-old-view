import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import MpinModal from "components/modals/MpinModal";
import BrokerDetailModal from "components/modals/broker-payment/BrokerDetailModal";
import SuccessModal from "components/modals/broker-payment/SuccessModal";
import StaticBar from "components/StaticBar";
import { brokerPaymentPageTitle } from "static-data/forPageTitle";
import { forBrokerPayment } from "static-data/forBreadCrumb";
import { useSetRecoilState } from "recoil";
import { isLoading } from "state-provider/forPageSetting";
import { brokerPaymentFormDataType } from "models/for-pages/brokerPayment_PageModels";
import BrokerPaymentForm from "./BrokerPaymentForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { brokerPaymentScheme } from "validation-schema/brokerPayment_validation";
import { getServiceCharge, payAmount } from "helper/fun_BrokerPayment";
import { enableOTPTransction, isOtpRequired } from "helper/common_Functions";
import OTPModal from "components/modals/OTPModal";

const BrokerPayment = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<brokerPaymentFormDataType>({
    resolver: yupResolver(brokerPaymentScheme),
    mode: "all",
  });

  const setLoading = useSetRecoilState(isLoading);
  const [charge, setCharge] = useState<string>("");
  const [mpin, setMpin] = useState<string>("");
  const [isOTPRequired, setIsOTPRequired] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isError_inOTPResponse, setIsError_inOTPResponse] = useState({
    isError: false as boolean,
    message: "" as string,
  });

  // for modals handle
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);

  // for handle response error message
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
    details: "",
  });
  const [formData, setFormData] = useState<brokerPaymentFormDataType>({
    fromAccount: "",
    DESTBrokerName: "",
    clientID: "",
    clientName: "",
    mobileNumber: "",
    transctionAmount: "",
    remarks: "",
    brokerCode: "",
  });

  const onSubmit = async (data: brokerPaymentFormDataType) => {
    setFormData(data);

    // getting service charge
    const serviceCharge = await getServiceCharge(
      data.transctionAmount,
      data.brokerCode
    );
    if (serviceCharge) {
      setCharge(serviceCharge);
    } else toast.error("here is error occured");

    setDetailModalShow(true);
  };

  const detailModalSubmitHandle = () => {
    setDetailModalShow(false);
    setMpinModalShow(true);
  };

  const mpinModalSubmitHandle = async () => {
    // checking is otp is required or not
    setMpinModalShow(false);
    const isotprequired = await isOtpRequired(formData.transctionAmount);
    if (isotprequired) {
      setIsOTPRequired(isotprequired);
    } else setIsSuccess(true);
  };

  const reSendOTP = async () => {
    const isotprequired = await isOtpRequired(formData.transctionAmount);
    if (isotprequired) {
      return;
    } else {
      setIsOTPRequired(false);
      setIsSuccess(true);
    }
  };

  const otpModalSubmitHandle = async () => {
    const isEnabled = await enableOTPTransction(otp);
    if (isEnabled && isEnabled.status === true) {
      // Calling Broker payment API
      doPayment();
    } else {
      setIsError_inOTPResponse({
        isError: true,
        message: isEnabled ? isEnabled.message : "",
      });
    }
  };

  // const handleSucessModal = () => {
  //   // handeling broker payment
  // };

  const doPayment = async () => {
    try {
      const res = await payAmount(formData, isOTPRequired, mpin, otp, charge);
      if (res && res.status === "Success" && res.details.status == "Complete") {
        setResponseMessage({
          status: "success",
          message: res.message,
          details: `${res.details.status} ${res.details.transactionIdentifier}`,
        });
        toast.success(
          `${res.details.status} ${res.details.transactionIdentifier}`
        );
        setIsSuccess(true);
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage({
          status: "failure",
          message: error.response.data.message,
          details: error.response.data.details,
        });
        toast.error(error.response.data.message);
        // setIsSuccess(true);
        return;
      }
    }
  };

  return (
    <Container>
      <StaticBar
        pageTitle={brokerPaymentPageTitle}
        breadCrumbData={forBrokerPayment}
      />
      <Row>
        <Col sm={12} md={6}>
          <Card className="card_Shadow" style={{ marginTop: "2rem" }}>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <BrokerPaymentForm
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
        </Col>
      </Row>

      <BrokerDetailModal
        modalShow={detailModalShow}
        data={formData}
        transctionCharge={charge}
        handleCancle={(event: boolean) => setDetailModalShow(event)}
        detailModalSubmitHandle={detailModalSubmitHandle}
      />
      <MpinModal
        mpinModalShow={mpinModalShow}
        setMpin={(mpin: string) => setMpin(mpin)}
        mpinModalSubmitHandle={mpinModalSubmitHandle}
        handleCancle={(event: boolean) => setMpinModalShow(event)}
      />
      <OTPModal
        otpModalShow={isOTPRequired}
        setOTP={(otp: string) => setOtp(otp)}
        otpModalSubmitHandle={otpModalSubmitHandle}
        resendOTPHandle={reSendOTP}
        isErrorInOTPResponse={isError_inOTPResponse}
        handleCancle={(e) => setIsOTPRequired(e)}
      />

      {/* <SuccessModal
        successModalShow={isSuccess}
        handleModalShow={(e) => setIsSuccessMessage(e)}
        responseMessage={responseMessage}
        fromAccount={fromAccount}
        toAccount={broker ? brokerName : ""}
        amount={amount}
        charge={charge}
        clientId={clientId}
        clientName={clientName}
        mobileNumber={mobileNumber}
        mpin={mpin}
      /> */}
      <ToastContainer autoClose={5000} position="top-right" />
    </Container>
  );
};

export default BrokerPayment;
