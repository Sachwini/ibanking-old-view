import { Card, ListGroup, Popover } from "react-bootstrap";

const ListStyle = {
  paddingLeft: "0",
  paddingBottom: "3px",
};

const CardStyle = {
  border: "none",
  paddingLeft: "0.7rem",
  paddingRight: "0.7rem",
};
const PopoverStyle = {
  minWidth: "12rem",
  // width: "auto",
  minHeight: "8rem",
  marginTop: "1rem",
};

export const notification = (
  <Popover id="popover-basic" style={PopoverStyle}>
    <Popover.Content>
      <Card style={CardStyle}>
        <ListGroup variant="flush">
          <ListGroup.Item style={ListStyle}>you got the amount</ListGroup.Item>
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

export const wallet = (
  <Popover id="popover-basic" style={PopoverStyle}>
    <Popover.Content>
      <Card style={CardStyle}>
        <Card.Text>nothing top show</Card.Text>
      </Card>
    </Popover.Content>
  </Popover>
);

export const userProfile = (
  <Popover id="popover-basic" style={PopoverStyle}>
    <Popover.Content>
      <Card style={CardStyle}>
        <Card.Text>User Profile</Card.Text>
        <Card.Text>User Details</Card.Text>
      </Card>
    </Popover.Content>
  </Popover>
);
