import React from 'react'
import { Card } from 'antd'
export default function Home() {
    return (
        //  卡片 
        <div className="card" >
            <Card
                bordered={false}
                style={{
                    width: '90%',
                    margin: '0 auto',
                    height: '80vh',
                }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div >
    )
}
