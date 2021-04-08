import React from 'react'
import { Card } from 'react-bootstrap';
import { GrDocumentPdf } from "react-icons/gr";
import './billPaymentLog.css'

function BillPaymentLog() {
    return (
      <>
        <Card style={{ width: "36rem" }}>
          <Card.Body>
                    <div>
                        <h5><GrDocumentPdf/><span className="pdf">DownLoad PDF</span></h5>
                        <h5>DownLoad Excel</h5> 
                    </div>
          </Card.Body>
        </Card>
      </>
    );
}

export default BillPaymentLog
