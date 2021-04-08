import React from 'react'
import { Card } from 'react-bootstrap';
import { CgNotes } from "react-icons/cg";
import { IoInformationCircleOutline } from "react-icons/io5";
import './Account.css'

function Account() {
    return (
      <div>
        <Card className="cardBackground">
          <Card.Body>
            <div className="row headerText">
              <div className="col">ODA Account</div>
              <div className="col">Usable Balance</div>
              <div className="col">Acutal Balance</div>
              <div className="col">
                <CgNotes />
                <span className="iconSpacing">Statment</span>
              </div>
              <div className="col headerText">
                <div className="iconSpacing">
                  <IoInformationCircleOutline />    
                  <span className="iconSpacing">Detail</span>  
                </div>
              </div>
            </div>
            <div className="row rowText">
              <div className="col">04911000579</div>
              <div className="col">
                <span className="default">NPR.</span>200,000.00
              </div>
              <div className="col">
                <span className="default">NPR.</span>200,000.00
              </div>
              <div className="col"></div>
              <div className="col"></div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
}

export default Account
