import { GetAllAccNoWithType } from "helper/CustomerData";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { useStateValue } from "state-provider/StateProvider";
import { ModalHeader, ModalFooter } from "styling/common/ModalStyling";
import {
  AccountInfoWrapper,
  AccountWrapper,
  IconWrapper,
} from "styling/for-modal/AccountSwitchStyling";

export interface Props {
  switchAccountModalShow: boolean;
  switchAccountModalShowHandle: (show: boolean) => void;
}

const SwitchAccountModal = (props: Props) => {
  const { switchAccountModalShow, switchAccountModalShowHandle } = props;
  const [{ customerDetails }, dispatch] = useStateValue();
  const [accountIndex, setAccountIndex] = useState<number>(0);
  const accountNoWithType = GetAllAccNoWithType();

  const handleActive = (index: number) => {
    if (index === accountIndex) {
      return "yes";
    }
    return "no";
  };

  const handleSubmit = () => {
    dispatch({
      type: "SWITCH_ACCOUNT",
      value: accountIndex,
    });
    switchAccountModalShowHandle(false);
  };

  return (
    <Modal
      show={switchAccountModalShow}
      onHide={handleSubmit}
      backdrop="static"
      keyboard={false}
      aria-labelledby="switch-account-modal"
      centered
      animation={true}
    >
      <ModalHeader closeButton>Switch Account</ModalHeader>
      <Modal.Body>
        {accountNoWithType.map((items, index) => {
          return (
            <AccountWrapper
              onClick={() => setAccountIndex(index)}
              key={index}
              active={handleActive(index)}
            >
              <IconWrapper active={handleActive(index)}>
                <FiUser size={30} />
              </IconWrapper>

              <span className="active_span" />

              <AccountInfoWrapper>
                <p className="account_number"> {items.accountNumber} </p>
                <p className="account_type">{items.accoutType}</p>
              </AccountInfoWrapper>
            </AccountWrapper>
          );
        })}
      </Modal.Body>

      <ModalFooter>
        <Button onClick={handleSubmit} variant="success">
          Switch
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SwitchAccountModal;
