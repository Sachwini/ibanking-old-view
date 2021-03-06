import StaticBar from "components/StaticBar";
import { QpayService } from "models/for-pages/quickPayModels";
import { Container, Image } from "react-bootstrap";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { baseUrl } from "services/BaseUrl";
import { forQuickPay } from "static-data/forBreadCrumb";
import { quickPayPageTitle } from "static-data/forPageTitle";
import Test2 from "./Test2";

interface paramProps {
  topicId: string;
}

const GeneralMerchant = (props: { data?: QpayService[] }) => {
  const data = props.data;
  let { topicId } = useParams<paramProps>();
  let { path, url } = useRouteMatch();

  const page = () => (
    <>
      <StaticBar pageTitle={quickPayPageTitle} breadCrumbData={forQuickPay} />
      <div
        style={{
          width: "fit-content",
          fontWeight: "bolder",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {data?.map((item) => {
          const sname = item.name.toLowerCase().split(" ").join("-");
          if (sname === topicId) {
            return item.services.map((sItems) => {
              return (
                <Link
                  to={`${url}/${sItems.service
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`}
                  key={sItems.id}
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
                  {sItems.icon ? (
                    <Image
                      width="50px"
                      height="50px"
                      src={`${baseUrl}/mbank/serviceIcon/${sItems.icon}`}
                      alt={sItems.service}
                    />
                  ) : (
                    ""
                  )}
                  <p
                    style={{
                      textAlign: "center",
                      margin: "0",
                      fontSize: "13px",
                    }}
                  >
                    {sItems.service}
                  </p>
                </Link>
              );
            });
          }
        })}
      </div>
    </>
  );

  console.log(path);

  return (
    <Container>
      <Switch>
        <Route exact path={`${path}`} component={page} />
        <Route path={`${path}/:id`} render={() => <Test2 />} />
      </Switch>
    </Container>
  );
};

export default GeneralMerchant;
