import { useState } from "react";
import { Card } from "react-bootstrap";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { useStateValue } from "state-provider/StateProvider";

const ProfileCard = () => {
  const [{ customerDetails, switchAccount }] = useStateValue();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  console.log("fromCard", customerDetails);
  return (
    <div>
      <Card
        className="card_Shadow"
        style={{
          backgroundColor: "#5bac47",
          minWidth: "340px",
          color: "white",
          border: "none",
        }}
      >
        <Card.Body style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
          <div style={{ width: "20%" }}>
            <AiOutlineUser className="circle-icon" size="3.3em" color="white" />
          </div>
          {!customerDetails?.accountDetail ? (
            ""
          ) : (
            <div style={{ width: "80%" }}>
              <Card.Title style={{ fontSize: "18px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {customerDetails?.fullName}
                  <span onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? (
                      <AiOutlineEye
                        size="23px"
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        size="23px"
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </span>
                </div>
              </Card.Title>
              <Card.Text className="m-0">
                {showDetails
                  ? customerDetails?.accountDetail[switchAccount]["mainCode"]
                  : "XXX-XXX-XXX-XXX"}
              </Card.Text>
              <Card.Text>
                {customerDetails?.accountDetail[switchAccount]["accountType"]}
              </Card.Text>
              <Card.Text>
                NPR.{" "}
                {showDetails
                  ? customerDetails?.accountDetail[switchAccount][
                      "availableBalance"
                    ]
                  : "XXX.XX"}
              </Card.Text>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileCard;
