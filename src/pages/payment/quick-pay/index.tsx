import { PageTitle } from "components/page-title";
import { apiResponse } from "models/apiResponse";
import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { get } from "services/AjaxService";
import GeneralMerchant from "./GeneralMerchant";
import { QpayService } from "./model";
import Test from "./Test";

const QuickPay = () => {
  let { path, url } = useRouteMatch();
  const [paymentService, setPaymentService] = useState<QpayService[]>();
  const userdata = paymentService;

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
      <Switch>
        <Route exact path={path}>
          <Test />
        </Route>
        <Route path={`${path}/:topicId`}>
          <GeneralMerchant />
        </Route>
      </Switch>
    </Container>
  );
};

export default QuickPay;
