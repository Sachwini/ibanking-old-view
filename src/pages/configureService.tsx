import { Card } from "react-bootstrap";
import { RiLockPasswordLine,RiUserStarLine,RiStarSmileLine} from "react-icons/ri";
import { VscReport } from "react-icons/vsc";
import { FiUserPlus } from "react-icons/fi";
import { BsShieldLock } from "react-icons/bs";
import { GrDocumentTime } from "react-icons/gr";
import { FcQuestions } from "react-icons/fc";
import { FaPiggyBank } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { Container, Row, Col } from "react-bootstrap";
import './iconCard.css' 
function ConfigureService() {
    return (
        <div>
            <Container fluid>
                <Row className="g-2"> 
                    <Col sm={4} md={1}> 
                        <Card className='cardItem'>
                            <Card.Body className='d-flex justify-content-center align-items-center'>
                                <RiLockPasswordLine size="40px" />
                            </Card.Body>
                            <Card.Text className='d-flex justify-content-center align-items-center'>
                                <span className='cardText'>
                                    Change Password</span>
                            </Card.Text>
                        </Card> 
                    </Col>
            <Col sm={2} md={1}>         
                        <Card className='cardItem'>
                            <Card.Body className='d-flex justify-content-center align-items-center'>
                                <VscReport size="40px"/> 
                            </Card.Body>
                            <Card.Text className='d-flex justify-content-center align-items-center'>
                            <span className='cardText'>
                                Report</span>
                            </Card.Text>
                        </Card>
                    </Col>
             <Col sm={2} md={1}>       
                        <Card className='cardItem'>
                            <Card.Body className='d-flex justify-content-center align-items-center'>
                                <FiUserPlus size="40px"/> 
                            </Card.Body>
                            <Card.Text className='d-flex justify-content-center align-items-center'>
                                <span className='cardText'>
                                New Account Activate</span>
                            </Card.Text>
                        </Card>
                        </Col>
            <Col sm={2} md={1}>
                        <Card className='cardItem'>
                            <Card.Body className='d-flex justify-content-center align-items-center'>
                 <BsShieldLock size="40px"/> 
            </Card.Body>
                <Card.Text className='d-flex justify-content-center align-items-center'>
                    <span className='cardText'>
                        Account Security</span>
                </Card.Text>
                            </Card>
                            </Col>
                        <Col sm={2} md={1}>
            <Card className='cardItem'><Card.Body className='d-flex justify-content-center align-items-center'>
                <RiUserStarLine size="40px"/> 
            </Card.Body>
                <Card.Text className='d-flex justify-content-center align-items-center'>
                    <span className='cardText'>
                        Favorite Merchant</span>
                </Card.Text>
                            </Card>
                            </Col>
                        <Col sm={2} md={1}>
            <Card className='cardItem'><Card.Body className='d-flex justify-content-center align-items-center'>
                <RiStarSmileLine size="40px"/> 
            </Card.Body>
                <Card.Text className='d-flex justify-content-center align-items-center'>
                    <span className='cardText'>
                        Favorite Account</span>
                </Card.Text>
                            </Card>
                            </Col>
                        <Col sm={2} md={1}>
            <Card className='cardItem'><Card.Body className='d-flex justify-content-center align-items-center'>
                <GrDocumentTime size="40px"/> 
            </Card.Body>
                <Card.Text className='d-flex justify-content-center align-items-center'>
                    <span className='cardText'>
                        Schedule Transfer</span>
                </Card.Text>
                        </Card>
                        </Col>
                        <Col sm={2} md={1}>
             <Card className='cardItem'><Card.Body className='d-flex justify-content-center align-items-center'>
                <FcMoneyTransfer size="40px"/> 
            </Card.Body>
                <Card.Text className='d-flex justify-content-center align-items-center'>
                    <span className='cardText'>
                        Schedule BillPayment</span>
                </Card.Text>
                        </Card>
                         </Col>
                        <Col sm={2} md={1}>
            <Card className='cardItem'><Card.Body className='d-flex justify-content-center align-items-center'>
                <FcQuestions size="40px"/> 
            </Card.Body>
                <Card.Text className='d-flex justify-content-center align-items-center'>
                    <span className='cardText'>
                        Change Security Question</span>
                </Card.Text>
                        </Card>
                         </Col>
                        <Col sm={2} md={1}>
             <Card className='cardItem'><Card.Body className='d-flex justify-content-center align-items-center'>
                <FaPiggyBank size="40px"/> 
            </Card.Body>
                <Card.Text className='d-flex justify-content-center align-items-center'>
                    <span className='cardText'>
                        Fixed Deposit</span>
                </Card.Text>
            </Card>
                    </Col>
                </Row>
            </Container>        
        </div>
    )
}

export default ConfigureService
 