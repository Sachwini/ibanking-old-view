import React from 'react'
import { Button, Card, Form, Container } from "react-bootstrap";

function ChangePassword() {
    return (
        <Container className="justify-content-center">
        <Card style={{ width: '30rem' }}><Card.Body>
           <Form>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label className='font-weight-bold'>Current Password</Form.Label>
                    <Form.Control type="password" placeholder="current password" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className='font-weight-bold'>New Password</Form.Label>
                    <Form.Control type="password" placeholder="new password" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className='font-weight-bold'>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="confirm password" />
                </Form.Group>

                <Button className='btn btn-warning' variant="primary" type="submit" block>
                    Change Password
                </Button>
                </Form>
            </Card.Body>
            </Card>
            <Card style={{ width: '36rem' }}><Card.Body>
                <div className='font-weight-bold'>
                    <ul className="list-unstyled">
                        <li style={{padding:'14px'}}>Password Policy</li>
                    <li>
                        <ul style={{paddingLeft:'16px'}}> 
                        <li>The overall length of password must be greater than 6 and less than 15</li>
                        <li>Atleast 1 Number of special characters in password</li>
                        <li>Atleast 1 Number of digits in password</li>
                        <li>Atleast 2 Number of lowercase letters in password</li>
                        <li>Atleast 1 Number of Uppercase letters in password</li>
                        </ul>
                    </li> 
                    </ul>
                    </div>
            </Card.Body>
            </Card>
        </Container>
    )
}

export default ChangePassword
