import { getFavAccDetails } from "helper/GetData";
import { favAccType } from "models/for-pages/favAcccountModels";
import React from "react";
import { Card } from "react-bootstrap";
import { RiBankLine } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { isFavAccAdded } from "state-provider/forPageSetting";
import { CardBody, CardHeader, CustomCard } from "styling/common/CardStyling";
import { IconStyle } from "styling/common/IconStyling";
import { FavAccListWrapper } from "styling/FavAccountStaling";

const FavAccountLists = () => {
  const [favAccData, setFavAccData] = React.useState<favAccType[]>([]);
  const isFavAccountAdded = useRecoilValue(isFavAccAdded);

  React.useEffect(() => {
    let isSuscribed = true;

    const getFavAccData = async () => {
      const data = await getFavAccDetails();
      if (isSuscribed && data) {
        setFavAccData(data);
      }
    };

    getFavAccData();
    return () => {
      isSuscribed = false;
    };
  }, [isFavAccountAdded]);

  return (
    <CustomCard className="card_Shadow">
      <CardHeader padding="2rem 2rem 1rem" borderColor="#f0f0f0" align="center">
        <Card.Title className="card_title title_color">
          Favourite Account List
        </Card.Title>

        <Card.Subtitle className="card_subtitle">
          you can find list of all your favourite accounts
        </Card.Subtitle>
      </CardHeader>

      <CardBody padding="1rem 0.5rem" className="my_cardBody">
        {favAccData.map((item) => {
          return (
            <FavAccListWrapper key={item.id}>
              <IconStyle hover>
                <RiBankLine size={50} />
              </IconStyle>

              <div className="accInfo_wrapper">
                <p className="heading">{item.data.destinationBankName}</p>
                <div className="normal">
                  <p>{item.data.destinationAccountNumber}</p>
                  <p>{item.data.destinationAccountHolderName}</p>
                </div>

                <p className="date">
                  <span>Added on :</span> {item.created}
                </p>
              </div>
            </FavAccListWrapper>
          );
        })}
      </CardBody>
    </CustomCard>
  );
};

export default FavAccountLists;
