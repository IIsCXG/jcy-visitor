import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router';
import https from '../../request';
import './index.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory()
export default function Login() {

    const navigate = useNavigate()
    // 表单成功的回调
    const onFinish = async (values) => {
        const { username, password } = values
        const res = await https.post(`/login`, { userName: username, password })
        console.log(res);
        if (res.code !== 200) {
            message.success(res.msg)
        }
        // 存token
        localStorage.setItem("token", res.data.token)
        //存用户名
        localStorage.setItem('username', values.username)
        message.success('登录成功')
        navigate('/Layout')



    }
    // 表单失败的回调

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    // 跳转注册页面
    function toRegistered() {
        navigate('/registered')

    }



    return (

        <>

            <div className="Login_body">
                <h1 className="Login_h1">登录·后台系统</h1>

                <div className="Login_content " >

                    <Form
                        className="Login_From"
                        name="basic"
                        labelCol={{ span: 16 }}
                        wrapperCol={{ span: 40 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        {/* 图标 *——往Form.Item里面放就会引起验证丢失（原因未知） */}
                        <UserOutlined className="Login_i1" />
                        <LockOutlined className="Login_i2" />
                        {/* 用户名框 */}
                        <Form.Item
                            validateTrigger='onBlur'
                            name="username"
                            rules={[{ required: true, message: '请输入您的用户名' },
                            { message: '用户名最小为3最大为6', min: 3, max: 6 }
                            ]}
                        >
                            <Input placeholder="用户名" style={{ width: '300px', paddingLeft: '24px' }} />
                        </Form.Item>
                        {/* 密码框 */}
                        <Form.Item
                            validateTrigger='onBlur'
                            name="password"
                            rules={[{ required: true, message: '请输入您的密码' }]}
                        >

                            <Input.Password placeholder="密码" style={{ width: '300px', paddingLeft: '24px' }} />

                        </Form.Item>
                        {/* 记住我 */}

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                        {/* 登录 */}
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>

                            <Button type="primary" htmlType="Login" style={{ width: '160px' }}  >
                                登录
                            </Button>

                        </Form.Item>
                        {/* 注册用户 */}
                        <Form.Item wrapperCol={{ offset: 9, span: 18 }}>

                            <span onClick={toRegistered} className='toRegistered' >没账号？来吧</span>

                        </Form.Item>

                    </Form>

                </div>
            </div>

        </>
    )
}