import { Card, Table } from 'react-bootstrap'

function FundTransferLimitDetail() {
    return (
        <>
            <Card style={{ width: '30rem' }}><Card.Body>
                <h4 style={{padding:'20px'}}>Fund Transfer Limit Detail</h4> 
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th className='text-warning'>Discription</th>
                    <th className='text-warning'>Limits</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Maximum Amount per transaction</td>
                    <td>2000000</td>
                    </tr>
                    <tr>
                    <td>Maximum Aount per Day</td>
                    <td>2000001</td>
                    </tr>
                    <tr>
                    <td>Maximum Amount per month</td>
                    <td>5000000</td>
                    </tr>
                    <tr>
                    <td>Minimum Amount per transaction</td>
                    <td>10.00</td>
                    </tr>
                    <tr>
                    <td>Maximum Amount per day</td>
                    <td>100</td>
                    </tr>
                    <tr>
                    <td>Today Total Transaction Count</td>
                    <td>0</td>
                    </tr>
                    <tr>
                    <td>Today Total Transaction Amount</td>
                    <td>0.00</td>
                    </tr>
                    <tr>
                    <td>This month Total Transaction Amount</td>
                    <td>0.00</td>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
            </Card>
        </>
    )
}

export default FundTransferLimitDetail
