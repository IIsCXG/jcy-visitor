import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import './index.less'
import { useNavigate } from 'react-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
export default function Registered() {
    const navigate = useNavigate()
    // 表单成功的回调
    const onFinish = (values) => {
        console.log('Success:', values);
        navigate('/')

    }
    // 表单失败的回调

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    // 返回登录页面
    function toLogin() {
        navigate('/login')

    }

    return (
        <>
            <div className="Registered_body">
                <h1 className="Registered_h1">注册·后台系统</h1>

                <div className="Registered_content" >
                    <Form
                        className="Registered_From"
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        {/* 图标——往Form.Item里面放就会引起验证丢失（原因未知） */}
                        <UserOutlined className="registered_i1" />
                        <LockOutlined className="registered_i2" />
                        <LockOutlined className="registered_i3" />
                        {/* 用户名框 */}

                        <Form.Item
                            validateTrigger='onBlur'

                            name="username"
                            rules={[{ required: true, message: '请输入您的用户名' }]}
                        >

                            <Input placeholder="用户名" style={{ width: '300px', paddingLeft: '24px' }} />
                        </Form.Item>
                        {/* 密码框 */}
                        <Form.Item
                            validateTrigger='onBlur'

                            name="password1"
                            rules={[{ required: true, message: '请输入您的密码' }]}
                        >

                            <Input.Password placeholder="请输入密码" style={{ width: '300px', paddingLeft: '24px' }} />
                        </Form.Item>
                        {/* 确认密码框 */}
                        <Form.Item
                            validateTrigger='onBlur'

                            name="password2"
                            rules={[{ required: true, message: '请确认你的密码' }]}
                        >

                            <Input.Password placeholder="请确认密码" style={{ width: '300px', paddingLeft: '24px' }} />
                        </Form.Item>
                        {/* 记住我 */}
                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                        {/* 注册 */}
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="Login" style={{ width: '160px' }}>
                                注册
                            </Button>
                        </Form.Item>
                        {/* 返回登录 */}
                        <Form.Item wrapperCol={{ offset: 10, span: 18 }}>

                            <span onClick={toLogin} className='toLogin' >返回登录</span>

                        </Form.Item>

                    </Form>
                </div>
            </div>


        </>
    )
}
