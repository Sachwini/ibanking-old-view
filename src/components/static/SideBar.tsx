import React from "react";
import { Button, Dropdown, Image } from "react-bootstrap";

const SideBar = () => {
  return (
    <div className="sidebar__ctrl">
      <div>
        <Dropdown>
          <Dropdown.Toggle
            variant="transparent"
            id="dropdown-basic"
            style={{
              boxShadow: "none",
            }}
          >
            <Image
              width={50}
              height={50}
              src="../logo512.png"
              roundedCircle
              style={{ padding: "10px", border: "2px solid white" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="mytest">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>sidebar</p>
        <p>sidebar</p>
        <p>sidebar</p>
        <p>sidebar</p>
        <p>sidebar</p>
        <p>sidebar</p>
        <p>sidebar</p>
      </div>
    </div>
  );
};

export default SideBar;
