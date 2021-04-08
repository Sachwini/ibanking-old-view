import React from 'react'
import { Card } from 'react-bootstrap'
import { GrDocumentTime } from "react-icons/gr";
import { FcMoneyTransfer } from "react-icons/fc";
import './image.css'

function UpcomingPayment() {
    return (
        <div>
            <Card style={{ width: '26rem',height:'26rem' }}>
                <Card.Body>
                    <img className="clock_logo" src="./uploads/clock.png" alt="" />
                    <div className="d-flex justify-content-center align-items-center"><h6 style={{marginTop:'30px'}}>No upcoming payments</h6></div>
                    <div className="d-flex justify-content-center align-items-center"><h6 style={{marginTop:'20px',color:'gray'}}>You have not set any upcoming payment recently</h6></div>
                    <div className="d-flex justify-content-center align-items-center"><h6 style={{ marginTop: '35px', color: 'gray',paddingBottom:'26px' }}>Select option to schedule</h6></div>
                    <div style={{justifyContent:'space-around',display:'flex'}}>
                        <div><GrDocumentTime size="40px" /></div>
                        <div><FcMoneyTransfer size="40px" /></div> 
                    </div>
                </Card.Body>  
             </Card>
        </div>
    ) 
}

export default UpcomingPayment
