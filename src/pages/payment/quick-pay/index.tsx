import { apiResponse } from "models/apiResponse";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import { get } from "services/AjaxService";
import GeneralMerchant from "./GeneralMerchant";
import { QpayService } from "./model";
import Test from "./Test";

const QuickPay = () => {
  let { path } = useRouteMatch();
  const [paymentService, setPaymentService] = useState<QpayService[]>();

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
        <Route
          exact
          path={path}
          render={() => <Test data={paymentService} />}
        />
        <Route
          path={`${path}/:topicId`}
          render={() => <GeneralMerchant data={paymentService} />}
        />
      </Switch>
    </Container>
  );
};

export default QuickPay;
