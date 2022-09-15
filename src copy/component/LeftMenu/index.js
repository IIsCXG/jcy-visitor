// 导入图标
import {
    AppstoreOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BankOutlined,
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
    getItem('图表', 'echarts', <BankOutlined />),
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
    // 菜单路由跳转
    function routers(path) {
        navigate(`/layout/${path.keyPath[0]}`)

    }
    const navigate = useNavigate()


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
            ref.current.style.width = "13%"
            ButtonRef.current.style.width = "13%"


        }

    };


    React.useEffect(() => {

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
                    height: '91vh',
                    marginTop: 64,

                }}
            >

                <Menu
                    onSelect={routers}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </div>

    );
};

export default LeftMenu;