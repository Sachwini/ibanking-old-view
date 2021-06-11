import { Card } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { useStateValue } from "state-provider/StateProvider";

const ProfileCard = () => {
  const [{ customerDetails, switchAccount }] = useStateValue();
  console.log("fromCard", customerDetails);
  return (
    <div>
      <Card
        style={{
          backgroundColor: "#5bac47",
          minWidth: "340px",
          color: "white",
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
                {customerDetails?.fullName}
              </Card.Title>
              <Card.Text className="m-0">
                {customerDetails?.accountDetail[switchAccount]["accountNumber"]}
              </Card.Text>
              <Card.Text>
                {customerDetails?.accountDetail[switchAccount]["accountType"]}
              </Card.Text>
              <Card.Text>
                NPR.{" "}
                {
                  customerDetails?.accountDetail[switchAccount][
                    "availableBalance"
                  ]
                }
              </Card.Text>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileCard;
