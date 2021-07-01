import { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiResponse } from "models/apiResponse";
import { Col } from "react-bootstrap";
import { useStateValue } from "state-provider/StateProvider";
import DetailModal from "components/modals/load-wallet/DetailModal";
import SuccessModal from "components/modals/load-wallet/SuccessModal";
import { forLoadWallet } from "static-data/forBreadCrumb";
import { loadWalletPageTitle } from "static-data/forPageTitle";
import StaticBar from "components/StaticBar";
import { loadWalletFormDataType } from "pages/payment/fund-transfer/model";
import { useForm } from "react-hook-form";
import LoadWalletForm from "./walletList/LoadWalletForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { loadWalletScheme } from "validation-schema/loadWallet_validation";

function LoadWallet() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<loadWalletFormDataType>({
    resolver: yupResolver(loadWalletScheme),
    mode: "all",
  });
  const [ValidationResponseMessage, setValidationResponseMessage] = useState({
    message: "",
    status: "",
    customerName: "",
    customerProfileImageUrl: "",
    validationIdentifier: "",
  });
  const [{ walletDetails }] = useStateValue();
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [validAccount, setValidAccount] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
    details: "",
  });

  const handleReset = (e: any) => {
    reset({
      contact: "",
      amount: "",
      remarks: "",
    });
  };

  const openDetailModal = () => {
    setDetailModalShow(true);
  };

  const walletValidate = async () => {
    try {
      const res = await get<any>(
        `api/walletvalidate?walletUsername=${getValues("contact")}&walletId=${
          walletDetails?.id
        }&amount=${getValues("amount")}`
      );
      if (res?.data.detail.status === "success") {
        setValidAccount(true);
      } else {
        setValidAccount(false);
      }
      if (res) {
        setValidationResponseMessage({
          message: res.data.detail.message,
          status: res.data.detail.status,
          customerName: res.data.detail.customerName,
          customerProfileImageUrl: res.data.detail.customerProfileImageUrl,
          validationIdentifier: res.data.detail.validationIdentifier,
        });
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const handleSubmit1 = async (e: any) => {
    e.preventDefault();
    if (
      !getValues("fromAccount") ||
      !getValues("contact") ||
      !getValues("amount") ||
      !getValues("remarks")
    ) {
      toast.error("Incomplete Field");
      return;
    }
    try {
      const res = await post<apiResponse<any>>(
        `api/wallet/load?amount=${getValues(
          "amount"
        )}&account_number=${getValues("fromAccount")}&desc_one=${getValues(
          "contact"
        )}&desc_two=${getValues("remarks")}&wallet_id=${
          walletDetails?.id
        }&validationIdentifier=${
          ValidationResponseMessage?.validationIdentifier
        }&skipValidation=true`,
        {}
      );
      if (res) {
        setIsSuccessMessage(true);
        setResponseMessage({
          status: "success",
          message: res.data.message,
          details: res.data.details,
        });
        toast.success(res.data.details);
        console.log(res.data);
      }
    } catch (error) {
      if (error.response) {
        setIsSuccessMessage(true);
        setResponseMessage({
          status: "failure",
          message: error.response.data.message,
          details: error.response.data.details,
        });
        toast.error(error.response.data.message);
      }
    }
  };

  const onSubmit = async (data: loadWalletFormDataType) => {
    console.log("data", data);
    walletValidate();
    openDetailModal();
  };

  return (
    <>
      <Container>
        <StaticBar
          pageTitle={loadWalletPageTitle}
          breadCrumbData={forLoadWallet}
        />
        <Col sm={12} md={6}>
          <Card className="card_Shadow">
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <LoadWalletForm
                  register={register}
                  errors={errors}
                  control={control}
                  watch={watch}
                  getValues={getValues}
                  setValue={setValue}
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>

      <ToastContainer />

      <DetailModal
        modalShow={detailModalShow}
        handleModalShow={(event: boolean) => setDetailModalShow(event)}
        ValidationResponseMessage={ValidationResponseMessage}
        validAccount={validAccount}
        modalFormSubmitHandle={handleSubmit1}
        cancleButton={(event: boolean) => setDetailModalShow(false)}
      />

      <SuccessModal
        successModalShow={isSuccessMessage}
        handleModalShow={(event: boolean) => setIsSuccessMessage(event)}
        responseMessage={responseMessage}
        okButton={handleReset}
      />
    </>
  );
}

export default LoadWallet;
