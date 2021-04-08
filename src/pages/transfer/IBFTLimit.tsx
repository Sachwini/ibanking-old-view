import React from 'react'
import { Card, Table } from 'react-bootstrap'

export const IBFTLimit = () => {

    return <Card>
        <Card.Title>Fund Transfer Limits</Card.Title>
        <Card.Body>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Limits</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Maximum Amount Per Transaction</td>
                        <td>2000000</td>
                    </tr>
                    <tr>
                        <td>Maximum Amount Per Day</td>
                        <td>2000001</td>
                    </tr>
                    <tr>
                        <td>Maximum Amount Per Month</td>
                        <td>5000000</td>
                    </tr>
                    <tr>
                        <td>Minimum Amount Per Transaction</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Maximum Transaction Per Day</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Today Total Transaction Count</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Today Total Transaction Amount</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>This Month Total Transaction Amount</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </Table>
        </Card.Body>
    </Card>
}