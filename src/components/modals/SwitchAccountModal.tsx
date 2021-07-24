import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { ModalHeader, ModalFooter } from "styling/common/ModalStyling";
import {
  AccountInfoWrapper,
  AccountWrapper,
  IconWrapper,
  SwitchAccModalContainer,
} from "styling/for-modal/AccountSwitchStyling";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  allAccListDetail,
  getSelectedAcc,
  setSelectedAccDetail,
} from "state-provider/globalUserData";
import {
  activeAccDefaultValue,
  userAccountType,
} from "models/for-pages/userAccountModels";

export interface Props {
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
}

const SwitchAccountModal = (props: Props) => {
  const { modalShow, handleModalShow } = props;
  const [activeAcc, setActiveAcc] = useState<userAccountType>(
    activeAccDefaultValue
  );
  const selectedAcc = useRecoilValue(getSelectedAcc);
  const [accountIndex, setAccountIndex] = useState<string>(selectedAcc.id);

  const setSelectedAccount = useSetRecoilState(setSelectedAccDetail);
  const allAccountListDetail = useRecoilValue(allAccListDetail);

  const handleActive = (index: string) => {
    if (index === accountIndex) {
      return "yes";
    }
    return "no";
  };

  const handleSelection = (data: userAccountType) => {
    setAccountIndex(data.id);
    setActiveAcc(data);
  };

  const handleSubmit = () => {
    setSelectedAccount({ isSelected: true, selectedAccDetails: activeAcc });
    handleModalShow(false);
  };

  return (
    <SwitchAccModalContainer
      show={modalShow}
      onHide={handleSubmit}
      backdrop="static"
      keyboard={false}
      aria-labelledby="switch-account-modal"
      centered
      animation={true}
    >
      <ModalHeader
        textTransform="uppercase"
        color="green"
        fs="20px"
        closeButton
      >
        <span className="flex-grow-1 text-center pt-1">Switch Account</span>
      </ModalHeader>
      <Modal.Body>
        {allAccountListDetail.map((items) => {
          return (
            <AccountWrapper
              onClick={() => handleSelection(items)}
              key={items.id}
              active={handleActive(items.id)}
            >
              <IconWrapper active={handleActive(items.id)}>
                <FiUser size={30} />
              </IconWrapper>

              <span className="active_span" />

              <AccountInfoWrapper>
                <p className="account_number"> {items.mainCode} </p>
                <p className="account_type">{items.accountType}</p>
              </AccountInfoWrapper>
            </AccountWrapper>
          );
        })}
      </Modal.Body>

      <ModalFooter className="myFooter">
        <Button onClick={handleSubmit} variant="outline-success">
          Switch
        </Button>
      </ModalFooter>
    </SwitchAccModalContainer>
  );
};

export default SwitchAccountModal;
