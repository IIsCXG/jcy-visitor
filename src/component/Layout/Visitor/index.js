import React, { useState, useEffect } from 'react'
import { Card, Space, Table, Tag, Breadcrumb, Pagination, Button, Input, Modal, message } from 'antd'
import { NavLink } from 'react-router-dom';
import './index.less'
import https from '../../../request';
//导入能获取最新数据的useState
import { useCallbackState } from '../../../utils/newUseState';


// const [data, setData] = useCallbackState({});

// setData({}, function (data) {
//     console.log("啦啦啦，我是回调方法", data);
// })

// 表格
const columns = [
    {
        title: '用户名',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '年龄',
        dataIndex: 'location',
    },
    {
        title: '时间',
        dataIndex: 'shootTime',
    },

    {
        title: '状态',
        dataIndex: 'state',
        render: (_, { state }) => (
            <>
                {state.map((tag) => {
                    let color = tag.length > 5 ? 'gold' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }

                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: () => (
            <Space Space size="middle" >

                <Button type="primary">修改</Button>

                <Button danger>删除</Button>

            </Space >
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        state: ['nice'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        state: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        state: ['teacher'],
    },

];
export default function Visitor() {
    const [pageNum, setPageNuber] = useState(1)//第几页
    const [pageSize, setPageSize] = useState(3)//每页显示多少条


    const [visitorData, setvisitorData] = useState([])//初次渲染页面的状态


    // 改变页码的函数
    async function changePage(pageNum, pageSize) {
        console.log(pageNum, pageSize);
        setPageNuber(pageNum)
        setPageSize(pageSize)
        const res = await https.post('/list', { pageNum, pageSize })
        console.log(res);
    }

    // 初次渲染的数据
    async function getData() {
        const res = await https.post('/list', { pageNum, pageSize })
        if (res.code !== 200) return message.error("请求失败")
        setvisitorData(res.data)
        console.log(res.data);

    }
    useEffect(() => {
        getData()
        console.log(visitorData);
    }, [visitorData])
    const { Search } = Input;

    // 搜索框的回调
    const onSearch = (value) => console.log(value);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        console.log(1);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

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
                        height: '72vh',
                    }}
                >

                    {/* 搜索框 */}
                    <Search placeholder="请输入用户名" onSearch={onSearch} enterButton style={{ width: 240, marginBottom: 20 }} />
                    {/* 添加按钮 */}
                    <Button type="primary" style={{ marginLeft: 40 }} onClick={showModal}>添加</Button>
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


                    <Table columns={columns} dataSource={visitorData} pagination={false} />
                    <Pagination
                        total={85}
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
