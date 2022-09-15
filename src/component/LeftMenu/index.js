// 导入图标
import {
    AppstoreOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BankOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { Menu, Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PubSub from 'pubsub-js';
import './index.less'



function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
// 菜单内容
const items = [
    getItem('首页', 'home', <BankOutlined />),
    getItem('欢迎页', 'hello', <BankOutlined />),
    getItem('访客管理', 'visitor', <UsergroupAddOutlined />),
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 5', 'm'),
        getItem('Option 6', '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];

const LeftMenu = () => {
    const navigate = useNavigate()
    // 菜单路由跳转
    function routers(path) {
        navigate(`/layout/${path.keyPath[0]}`)

    }
    // 换肤的状态
    const [theme, setTheme] = useState('dark');




    const [collapsed, setCollapsed] = useState(false);

    const ref = useRef(null)
    const ButtonRef = useRef(null)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        // 发起伸缩栏订阅
        PubSub.publish('msg', collapsed)
        if (collapsed === false) {
            ref.current.style.width = "5%"
            ButtonRef.current.style.width = "5%"

        }
        else {
            ref.current.style.width = "13.2%"
            ButtonRef.current.style.width = "13%"


        }

    };


    React.useEffect(() => {
        PubSub.subscribe('theme', (_, data) => {
            setTheme(data ? 'dark' : 'light');
            console.log(theme);
        })
        return () => {
            // 关闭伸缩栏订阅消息
            PubSub.unsubscribe('msg')
        }
    }, [])
    return (
        <div className="LeftMenu_body" ref={ref}  >
            {/* 菜单栏伸缩按钮 */}
            <Button
                ref={ButtonRef}
                className="LeftMenu_button"
                type="white"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div

                style={{
                    width: 200,
                    // height: '91vh',
                    marginTop: 64,

                }}
            >

                <Menu
                    onSelect={routers}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme={theme}
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </div>

    );
};

export default LeftMenu;