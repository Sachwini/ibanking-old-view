import { PageTitle } from "components/PageTitle";
import { Container, Image } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { baseUrl } from "services/BaseUrl";
import { QpayService } from "./model";

const Test = (props: { data?: QpayService[] }) => {
  const data = props.data;
  let { path, url } = useRouteMatch();

  console.log("test : ", path);

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
        {data?.map((item) => {
          return (
            <Link
              to={`${url}/${item.name.toLowerCase().split(" ").join("-")}`}
              key={item.id}
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
              {item.imageUrl ? (
                <Image
                  width="50px"
                  height="50px"
                  src={`${baseUrl}${item.imageUrl}`}
                  alt={item.name}
                />
              ) : (
                ""
              )}
              <p style={{ textAlign: "center", margin: "0", fontSize: "13px" }}>
                {item.name}
              </p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default Test;
