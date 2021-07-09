import { Button, Card, Form, Container, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { post } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";
import { toast, ToastContainer } from "react-toastify";
import StaticBar from "components/StaticBar";
import { ChangeMpinPageTitle } from "static-data/forPageTitle";
import { forChangeMpin } from "static-data/forBreadCrumb";
import { changeMpinType } from "pages/payment/fund-transfer/model";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ChangeMpinForm from "./ChangeMpinForm";
import { mpinChangeSchema } from "validation-schema/mpinChange_validation";

function ChangeMpin() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<changeMpinType>({
    resolver: yupResolver(mpinChangeSchema),
    mode: "all",
  });

  const [errorResponse, setErrorResponse] = useState({
    message: "",
    password: "",
    repassword: "",
    oldPassword: "",
  });

  const onSubmit = async () => {
    try {
      const res = await post<apiResponse<any>>(
        `api/changepin?newmPin=${getValues("newMpin")}&remPin=${getValues(
          "confirmMpin"
        )}&oldmPin=${getValues("currentMpin")}`,
        ""
      );
      if (res) {
        toast.success("Your Mpin Changed Successfully");
      }
    } catch (error) {
      setErrorResponse({
        message: error.response.data.message,
        password: error.response.data.details.password,
        repassword: error.response.data.details.repassword,
        oldPassword: error.response.data.details.oldPassword,
      });
    }
  };

  return (
    <Container fluid className="justify-content-center pt-4">
      <StaticBar
        pageTitle={ChangeMpinPageTitle}
        breadCrumbData={forChangeMpin}
      />
      <div style={{ display: "flex" }}>
        <Row>
          <Col sm={12} md={6}>
            <Card
              style={{ width: "30rem", marginRight: "10px" }}
              className="card_Shadow"
            >
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <ChangeMpinForm
                    register={register}
                    errors={errors}
                    reset={reset}
                    errorResponse={errorResponse}
                  />
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </Container>
  );
}

export default ChangeMpin;
