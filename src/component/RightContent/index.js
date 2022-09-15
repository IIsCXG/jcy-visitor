import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { CaretDownOutlined, LoadingOutlined } from '@ant-design/icons'
import { Avatar, Image, message, Popconfirm, notification, Spin } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import PubSub from 'pubsub-js';
import './index.less'
import https from '../../request';

// 右侧的正在开发中
const openNotification = () => {
    notification.open({

        description: '宝贝不要猴急，正在努力开发中',
        duration: 2,
    });
};

// 加载图标
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 16,

        }}
        spin
    />
);

export default function RightContent() {
    const text = '是否退出?';
    const bodyRef = useRef()
    const iconRef = useRef()
    // 右侧头像加载初始化
    const [loadingFlag, setflag] = useState(false)
    const [themeFlag, setThemeFlag] = useState(false)


    React.useEffect(() => {
        // 订阅伸缩栏消息
        PubSub.subscribe('msg', (_, data) => {
            if (data === false) bodyRef.current.style.width = "95%"
            else bodyRef.current.style.width = "87%"
        })

        // 右侧头像加载
        setTimeout(() => {
            iconRef.current.style.display = "block"
            setflag(true)
        }, 3000)
    }, [])
    const navigate = useNavigate()
    // 点击确认退出的回调
    const confirm = async () => {
        const res = await https.post('/logout')
        console.log(res);
        if (res.code === 200) {

            navigate('/login')
            // 清除token
            localStorage.removeItem("token");
        }


    };
    // 点击取消退出的回调
    function cancel() {
        message.success('取消成功');
    }
    // 点击左侧菜单栏换肤
    const changeTheme = () => {
        setThemeFlag(!themeFlag)
        PubSub.publish('theme', themeFlag)
        // console.log(themeFlag);
    };



    return (

        < div className="RightContent_body" ref={bodyRef} >

            {/* 内容头部 */}
            < div className="contentR_header" >
                {/* 欢迎词 */}

                <span className="Welcome_name" style={{ width: '100%' }}  > 欢迎{localStorage.getItem("username")}</span >
                {/* 头像 */}
                <span className="header_avatar" >
                    {
                        loadingFlag ? <Avatar
                            src={
                                <Image
                                    src="https://joeschmoe.io/api/v1/random"
                                    style={{
                                        width: 32,
                                    }}
                                />
                            }
                        /> : <Spin size='small ' indicator={antIcon} style={{
                            position: 'relative',
                            right: 20,
                            top: 8,
                        }} />
                    }
                    {/* 小图标 */}
                    <span className="span_icon" ref={iconRef}>
                        <CaretDownOutlined />
                        {/*  二级菜单 */}
                        <ul className="nav-list">
                            <li>
                                <Popconfirm placement="bottom" title={text} onCancel={cancel} onConfirm={confirm} okText="是" cancelText="否">
                                    <NavLink to="/Login">退出</NavLink>
                                </Popconfirm>
                            </li>
                            <li>

                                <a href="#" onClick={changeTheme}>菜单栏换肤</a>
                            </li>
                            <li>

                                <a href="#" onClick={openNotification}>有待开发</a>
                            </li>

                        </ul>
                    </span>
                </span >

            </div >
            {/* 内容主体 */}
            < div className="contentR_main" >
                {/* 路由占位符 */}
                <Outlet />


            </div >

        </div >
    )
}
