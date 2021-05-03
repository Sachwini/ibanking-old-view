import { PageTitle } from "components/page-title";
import { apiResponse } from "models/apiResponse";
import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { get } from "services/AjaxService";
import { QpayService } from "./model";

const Test = (props: { data?: QpayService[] }) => {
  let { path, url } = useRouteMatch();
  const [paymentService, setPaymentService] = useState<QpayService[]>();
  const userdata = paymentService;

  // console.log(userdata);

  useEffect(() => {
    let isSubscribed = true;

    const loadData = async () => {
      const res = await get<apiResponse<QpayService[]>>(
        "api/category?withService=true"
      );
      if (isSubscribed) {
        setPaymentService(res.data.details);
      }
    };

    loadData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Container>
      <PageTitle
        title="Quick paymment"
        subTitle="Enjoy Quick Payment Facility"
      />
      <div
        style={{
          width: "fit-content",
          fontWeight: "bolder",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {paymentService?.map((data) => {
          return (
            <Link
              to={`${url}/${data.name.toLowerCase().split(" ").join("-")}`}
              key={data.id}
              style={{
                padding: "8px",
                margin: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              {data.imageUrl ? (
                <Image
                  width="50px"
                  height="50px"
                  src={`http://202.63.242.139:9091${data.imageUrl}`}
                  alt={data.name}
                />
              ) : (
                ""
              )}
              <p style={{ textAlign: "center", margin: "0", fontSize: "13px" }}>
                {data.name}
              </p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default Test;
