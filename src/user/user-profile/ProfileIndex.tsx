import { Container } from "react-bootstrap";
import ChangePassword from "user/user-setting/ChangePassword";
import Profile from "./Profile";

const ProfileIndex = () => {
  return (
    <Container fluid>
      <Profile />
      <ChangePassword />
    </Container>
  );
};

export default ProfileIndex;
