import { Button, Card, Form } from 'react-bootstrap'

function BillPaymentTransfer() {
    return (
         <>
            <Card style={{ width: '30rem' }}><Card.Body>
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className='font-weight-bold'>From Account</Form.Label>
                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                    </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className='font-weight-bold'>Merchant Group</Form.Label>
                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                    </Form.Group>
                    
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className='font-weight-bold'>Pay For</Form.Label>
                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                    </Form.Group>
                    <Button className='btn btn-warning' variant="primary" type="submit"> 
                    Submit
                </Button>

                <Button className='btn btn-light' style={{marginLeft:'20px'}} variant="secondary" type="submit"> 
                    Reset
                </Button>
            </Form>
            </Card.Body>
            </Card>
        </>
    )
}

export default BillPaymentTransfer
