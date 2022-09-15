import React, { useState, useEffect } from 'react'
import { Card, Space, Table, Tag, Breadcrumb, Pagination, Button, Input, Modal, message, Image, DatePicker } from 'antd'
import { NavLink } from 'react-router-dom';
import './index.less'
import https from '../../../request';
// 把日期选择框改为中文
import 'moment/locale/zh-cn';



// 表格
const columns = [
    {
        title: '用户名',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '位置',
        dataIndex: 'location',
    },
    {
        title: '图片',
        dataIndex: 'picture',
        render: picture => (
            <Image src={picture} style={{ maxWidth: 60, maxHeight: 40 }} alt="加载中" />
        ),
    },
    {
        title: '时间',
        dataIndex: 'shootTime',
    },


    {
        title: '状态',
        dataIndex: 'state',
        render: (state) => (
            <>
                <Tag color={state === 1 ? 'green' : 'volcano'}  >
                    {state === 1 ? '已处理' : '未处理'}
                </Tag>
            </>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: () => (
            <Space size="middle" >

                <Button type="primary">修改</Button>

                <Button danger>删除</Button>

            </Space >
        ),
    },
];

export default function Visitor() {
    const [pageNum, setPageNuber] = useState(1)//第几页
    const [pageSize, setPageSize] = useState(5)//每页显示多少条
    const [visitorData, setvisitorData] = useState([])//初次渲染页面的状态
    const [isModalOpen, setIsModalOpen] = useState(false)// 添加对话框初始值

    // 改变页码的函数
    async function changePage(pageNum, pageSize) {
        console.log(pageNum, pageSize);
        setPageNuber(pageNum)
        setPageSize(pageSize)
        const res = await https.post('/list', { pageNum, pageSize })
        setvisitorData(res.data)

        console.log(res);
    }

    // 初次渲染的数据
    async function getData() {
        const res = await https.post('/list', { pageNum, pageSize })
        if (res.code !== 200) return message.error("请求失败")
        setvisitorData(res.data)//列表数据
        sessionStorage.setItem('total', res.count)//总条数,因为会导致页面刷新状态存不住，所以用这个
        console.log(res);

    }

    useEffect(() => {

        getData()
    }, [])
    const { Search } = Input;

    // 搜索框的回调
    const onSearch = (value) => console.log(value);

    // 日期选择框回调
    const VisitorTime = (date, dateString) => {
        console.log(date, dateString);
    };


    // // 添加对话框回调

    const showModal = () => {
        console.log(1);
        setIsModalOpen(true);
    };
    // // 添加对话框确认按钮回调

    const handleOk = () => {
        setIsModalOpen(false);
    };
    // // 添加对话框取消按钮回调

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {/* 面包屑 */}
            <Breadcrumb style={{ position: 'relative', bottom: 44, left: 64 }} >
                <Breadcrumb.Item> <NavLink to='/layout/home'>首页</NavLink> </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">访客管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            {/* 卡片 */}
            < div className="card" >
                <Card
                    bordered={false}
                    style={{
                        width: '90%',
                        margin: '0 auto',
                        height: '76vh',
                    }}
                >

                    {/* 搜索框 */}
                    <Search placeholder="请输入用户名" onSearch={onSearch} enterButton style={{ width: 240, marginBottom: 20 }} />
                    {/* 日期选择框 */}
                    <Space direction="vertical" style={{ marginLeft: 40 }}>
                        <DatePicker onChange={VisitorTime} />
                    </Space>
                    {/* 添加按钮 */}
                    <Button type="primary" style={{ float: 'right' }} onClick={showModal}>添加</Button>
                    {/* 添加对话框 */}
                    <Modal
                        title="请添加"
                        visible={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        maskClosable={false}

                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>

                    <Table rowKey="key" columns={columns} dataSource={visitorData} pagination={false} />
                    <Pagination
                        total={sessionStorage.getItem("total")}
                        defaultPageSize='5'//默认页码
                        showSizeChanger
                        showQuickJumper
                        onChange={changePage}
                        pageSizeOptions={[1, 3, 5]}
                        showTotal={(total) => `总共有 ${total} 条信息`}
                    />
                </Card>
            </ div>
        </>

    )
}
