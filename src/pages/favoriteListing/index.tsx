import StaticBar from "components/StaticBar";
import { Col, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { forFavouriteAccount } from "static-data/forBreadCrumb";
import { FavAccContainer } from "styling/FavAccountStaling";
import AddFavorite from "./AddFavorite";
import FavAccountLists from "./FavAccountLists";

const FavouriteAccount = () => {
  const pageTitle = {
    title: "Your Favourate Account",
    subTitle: (
      <span>
        Add or Remove your Favourite Accounts <FaHeart color="red" size={18} />
      </span>
    ),
  };

  return (
    <FavAccContainer fluid className="px-5 pl-2">
      <StaticBar pageTitle={pageTitle} breadCrumbData={forFavouriteAccount} />
      <Row>
        <Col sm={12} md={6}>
          <AddFavorite />
        </Col>
        <Col sm={12} md={6}>
          <FavAccountLists />
        </Col>
      </Row>
    </FavAccContainer>
  );
};

export default FavouriteAccount;
