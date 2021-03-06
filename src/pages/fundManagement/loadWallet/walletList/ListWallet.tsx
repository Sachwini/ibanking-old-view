import StaticBar from "components/StaticBar";
import { apiResponse } from "models/apiResponse";
import { walletListType } from "models/for-pages/fundMgmtModels";
import { Loader } from "pages/static/Loader";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { get } from "services/AjaxService";
import { baseUrl } from "services/BaseUrl";
import { useStateValue } from "state-provider/StateProvider";
import { forLoadWallet } from "static-data/forBreadCrumb";
import { loadWalletPageTitle } from "static-data/forPageTitle";
import "./ListWallet.css";

function ListWallet() {
  const [{}, dispatch] = useStateValue();
  const [wallets, setWallets] = useState<walletListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;
    const getListOfWallet = async () => {
      try {
        const res = await get<apiResponse<walletListType[]>>(
          "/api/wallet/list"
        );

        if (res) {
          if (isSubscribed) {
            setWallets(res.data.details);
            setLoading(false);
            console.log("wallets list", wallets);
          }
        }
      } catch (error) {
        if (isSubscribed) {
          setLoading(false);
          console.log("error", error.response.data.message);
        }
      }
    };
    getListOfWallet();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleInfo = (index: any) => {
    console.log("wallets form handleInfo", wallets);
    dispatch({
      type: "LOAD_WALLET_DETAILS",
      walletDetails: wallets[index],
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="justify-content-center">
      <StaticBar
        pageTitle={loadWalletPageTitle}
        breadCrumbData={forLoadWallet}
      />
      <div className="d-flex flex-wrap mt-1">
        {wallets?.map((wallet, index) => {
          return (
            <Link
              onClick={() => {
                handleInfo(index);
              }}
              to="/list-wallet/load-wallet"
              key={index}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Card className="card__ctrl" key={index}>
                <Card.Body className="cardBody__ctrl">
                  <Card.Title>
                    <Image
                      width="70px"
                      height="70px"
                      src={`${baseUrl}/mbank/serviceIcon/${wallet.icon}`}
                      alt={wallet?.name}
                      className="wallet__icon"
                    />
                  </Card.Title>
                  <Card.Text className="cardText">{wallet?.name}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

export default ListWallet;
