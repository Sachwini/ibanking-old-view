import { Card } from "react-bootstrap";
import { GrDocumentPdf } from "react-icons/gr";
import { ImFileExcel } from "react-icons/im";
import "../user/user-account/Account.css";

const Download = () => {
  return (
    <Card style={{ width: "60rem" }}>
      <Card.Body>
        <div className="inputBoxesLayout">
          <div>
            <p>
              <GrDocumentPdf />
              <span className="pdf">DownLoad PDF</span>
            </p>
          </div>
          <div className="boxSpacing">
            <p>
              <ImFileExcel />
              <span className="pdf">DownLoad Excel</span>
            </p>
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
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Download;
