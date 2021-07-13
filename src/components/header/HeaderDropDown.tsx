import { Card, ListGroup, Popover } from "react-bootstrap";

export const ListStyle = {
  paddingLeft: "0",
  paddingBottom: "3px",
};

export const CardStyle = {
  border: "none",
  paddingLeft: "0.7rem",
  paddingRight: "0.7rem",
};
const PopoverStyle = {
  minWidth: "12rem",
  marginTop: "1rem",
};

export const notification = (props: any) => {
  return (
    <Popover id="popover-basic" style={PopoverStyle}>
      <Popover.Content>
        <Card style={CardStyle}>
          <ListGroup variant="flush">
            <ListGroup.Item style={ListStyle}>
              send you an amount
            </ListGroup.Item>
            <ListGroup.Item style={ListStyle}>
              roshan send you payment request
            </ListGroup.Item>
            <ListGroup.Item style={ListStyle}>
              Happy birthday to you bro
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Popover.Content>
    </Popover>
  );
};

export const userProfile = (
  <Popover id="popover-basic" style={PopoverStyle}>
    <Popover.Content style={{ padding: "0" }}>
      <Card style={CardStyle}>
        <Card.Text>User Profile</Card.Text>
        <Card.Text>User Details</Card.Text>
      </Card>
      <div
        style={{
          textAlign: "center",
          padding: "8px",
          background: "#f5f5f5",
          cursor: "pointer",
        }}
      >
        LogOut
      </div>
    </Popover.Content>
  </Popover>
);
