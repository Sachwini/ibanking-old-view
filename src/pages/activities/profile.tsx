import React from 'react'
import { Card } from 'react-bootstrap'
import { HiUserCircle } from "react-icons/hi";

function Profile() {
    return (
        <div>
            <Card style={{ width: '26rem',height:'26rem',backgroundColor:'red' }}>
                <Card.Body>
                    <div>
                        <HiUserCircle className="circle-icon"/>   
                    </div>
                   
                </Card.Body>  
             </Card>
        </div>
    )
}

export default Profile
