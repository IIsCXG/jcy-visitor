
import React from 'react'
import { Card, Breadcrumb } from 'antd'
import { NavLink } from 'react-router-dom'
export default function Hello() {
    return (
        <>
            {/* 面包屑 */}
            <Breadcrumb style={{ position: 'relative', bottom: 44, left: 64 }} >
                <Breadcrumb.Item> <NavLink to='/layout/home'>首页</NavLink> </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">欢迎页</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            {/*  卡片  */}
            <div className="card" >
                <Card
                    bordered={false}
                    style={{
                        width: '90%',
                        margin: '0 auto',
                        height: '76vh',
                    }}
                >
                    <p>hello</p>

                </Card>
            </div >
        </>
    )
}
