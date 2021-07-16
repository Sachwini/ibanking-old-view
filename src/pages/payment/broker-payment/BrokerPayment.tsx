import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import MpinModal from "components/modals/MpinModal";
import BrokerDetailModal from "components/modals/broker-payment/BrokerDetailModal";
import StaticBar from "components/StaticBar";
import { brokerPaymentPageTitle } from "static-data/forPageTitle";
import { forBrokerPayment } from "static-data/forBreadCrumb";
import { brokerPaymentFormDataType } from "models/for-pages/brokerPaymentModels";
import BrokerPaymentForm from "./BrokerPaymentForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { brokerPaymentScheme } from "validation-schema/brokerPayment_validation";
import {
  brokerFormDefaultValue,
  getServiceCharge,
  payAmount,
} from "helper/fun_BrokerPayment";
import { enableOTPTransction, isOtpRequired } from "helper/common_Functions";
import OTPModal from "components/modals/OTPModal";
import BrokerSuccessModal from "components/modals/broker-payment/SuccessModal";
import BrokerErrorModal from "components/modals/broker-payment/BrokerErrorModal";
import { Loader } from "pages/static/Loader";

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

  const [charge, setCharge] = useState<string>("");
  const [mpin, setMpin] = useState<string>("");
  const [isOTPRequired, setIsOTPRequired] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  // for modals handle
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [successModalShow, setSuccessModalShow] = useState<boolean>(false);
  const [successMessage, setSuccessMesage] = useState<string>("");
  const [errorMoalShow, setErrorModalShow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [transctionIdentifier, setTransctionIdentifier] = useState("");
  const [formData, setFormData] = useState<brokerPaymentFormDataType>(
    brokerFormDefaultValue
  );

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: brokerPaymentFormDataType) => {
    setFormData(data);
    setLoading(true);

    // getting service charge
    const serviceCharge = await getServiceCharge(
      data.transctionAmount,
      data.brokerCode
    );
    if (serviceCharge) {
      setCharge(serviceCharge);
    }
    setLoading(false);

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
    } else doPayment();
  };

  const reSendOTP = async () => {
    const isotprequired = await isOtpRequired(formData.transctionAmount);
    if (isotprequired) {
      return;
    } else {
      setIsOTPRequired(false);
      doPayment();
    }
  };

  const otpModalSubmitHandle = async () => {
    await enableOTPTransction(otp);
    setIsOTPRequired(false);
    doPayment();
  };

  const doPayment = async () => {
    // setLoading(true);
    try {
      const res = await payAmount(formData, isOTPRequired, mpin, otp, charge);
      if (
        res &&
        res.status.toLowerCase() === "success" &&
        res.detail.status.toLowerCase() == "complete"
      ) {
        // setLoading(false);
        setSuccessMesage(res.message);
        setTransctionIdentifier(res.detail.transactionIdentifier);
        setSuccessModalShow(true);
      }
    } catch (error) {
      if (error.response) {
        // setLoading(false);
        setErrorMessage(error.response.data.message);
        setErrorModalShow(true);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

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
        handleCancle={(e) => setIsOTPRequired(e)}
      />

      <BrokerSuccessModal
        successModalShow={successModalShow}
        mpin={mpin}
        transctionIdentifier={transctionIdentifier}
        successMessage={successMessage}
        handleCancle={(e) => setSuccessModalShow(e)}
      />

      <BrokerErrorModal
        errorModalShow={errorMoalShow}
        errorInfoData={formData}
        errorMessage={errorMessage}
        transctionCharge={charge}
        handleCancle={(e) => setErrorModalShow(e)}
      />
    </Container>
  );
};

export default BrokerPayment;
