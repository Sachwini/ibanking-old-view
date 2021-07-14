import { apiResponse } from "models/apiResponse";
import {
  favAccListType,
  favAccType,
} from "models/for-pages/favAcccount_PageModels";
import { useEffect, useRef, useState } from "react";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { RiBankLine, RiUserStarLine } from "react-icons/ri";
import { get } from "services/AjaxService";
import { PooverContainer } from "styling/common/FavAcc_pooverStyling";
import { IconStyle } from "styling/common/IconStyling";
import { v4 as uuidv4 } from "uuid";

interface Props {
  selectedDetails: (data: favAccListType) => void;
}

const FavAccPopover = ({ selectedDetails }: Props) => {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [favAccList, setFavAccList] = useState<favAccListType[]>([]);
  const target = useRef();

  useEffect(() => {
    let isSubscribed = true;

    const getFavAccData = async () => {
      try {
        const res = await get<apiResponse<favAccType[]>>(
          "/api/userSavedPayment?serviceInfoType=CONNECT_IPS"
        );
        if (isSubscribed && res) {
          const resData: favAccListType[] = [];
          res.data.details.forEach((items) => resData.push(items.data));
          setFavAccList(resData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFavAccData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleSelect = (value: favAccListType) => {
    selectedDetails(value);
    setShowPopover(false);
  };

  const UserProfile = (
    <PooverContainer id="Fav-Account-Poover">
      <Popover.Title>
        My Saved Bank Account <span>{favAccList.length}</span>
      </Popover.Title>

      <Popover.Content>
        {favAccList.map((item, index) => {
          return (
            <div
              className="bank_listConainer"
              key={uuidv4()}
              onClick={() => handleSelect(item)}
            >
              <IconStyle hover className="pr-3 pt-2 ">
                <RiBankLine size={30} />
              </IconStyle>
              <div className="details_container">
                <strong>{item.destinationBankName}</strong>
                <p> {item.destinationAccountNumber}</p>
                <strong>{item.destinationAccountHolderName}</strong>
              </div>
            </div>
          );
        })}
      </Popover.Content>
    </PooverContainer>
  );

  return (
    <OverlayTrigger
      transition={true}
      show={showPopover}
      trigger="click"
      placement="auto"
      overlay={UserProfile}
      rootClose
    >
      <OverlayTrigger
        transition={true}
        key="favAccount"
        trigger={["hover", "focus"]}
        placement="top"
        overlay={<Tooltip id="favAccount">Your Favourite Accounts</Tooltip>}
      >
        <IconStyle hover>
          <RiUserStarLine
            size={30}
            onClick={() => setShowPopover(!showPopover)}
          />
        </IconStyle>
      </OverlayTrigger>
    </OverlayTrigger>
  );
};

export default FavAccPopover;
