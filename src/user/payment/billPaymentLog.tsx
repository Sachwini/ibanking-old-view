import { Card, Table } from "react-bootstrap";
import { GrDocumentPdf } from "react-icons/gr";
import { ImFileExcel } from "react-icons/im";
import "./billPaymentLog.css";

function BillPaymentLog() {
  return (
    <>
      <Card style={{width:"67rem"}}>
        <Card.Body>
          <div className="inputBoxesLayout"> 
            <div>
              <p>
                <GrDocumentPdf color="green" /> 
                <span className="pdf">DownLoad PDF</span>
              </p>
            </div>
            <div className="boxSpacing">
              <p>
                <ImFileExcel color="green" />
                <span className="pdf">DownLoad Excel</span>
              </p>{" "}
            </div>
          </div>
          <div>
            <div className="inputBoxesLayout">
              <div>
                <label>From</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="boxSpacing">
                <label>To</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="YYYY-MM-DD"
                  />
                </div>
              </div>

              <div className="boxSpacing">
                <label style={{ opacity: "0" }}>hide</label>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Show
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="custom__tabel">
            <Table responsive="sm" size="sm">
              <thead style={{ fontSize: "14px", color: "#c4bf1b" }}>
                <tr>
                  <th>REF. CODE</th>
                  <th>TRANSACTION TYPE</th>
                  <th>MARCHANT NAME</th>
                  <th>FROM ACCOUNT</th>
                  <th>TO ACCOUNT</th>
                  <th>AMOUNT</th>
                  <th>COMMISSION TYPE</th>
                  <th>CALCULATED AMOUNT</th>
                  <th>TRANSACTION NARRATION1</th>
                  <th>TRANSACTION NARRATION2</th>
                  <th>TRANSACTION TIME</th>
                  <th>TRANSACTION STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>114658</td>
                  <td>PAYMENT</td>
                  <td>Ncell Topup</td>
                  <td>04934000325</td>
                  <td>00001421070001</td>
                  <td>100</td>
                  <td>N/A</td>
                  <td>100</td>
                  <td>Ncell Topup-9802013689</td>
                  <td>N/A</td>
                  <td>March 31,2021</td>
                  <td>TRANSACTION_COMPLETED</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default BillPaymentLog;
