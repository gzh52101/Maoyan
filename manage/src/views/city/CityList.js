import React, { useEffect, useCallback, useState, useRef } from 'react'
import { Table, Button, Popconfirm, message, Input, Form, Modal } from 'antd';
import request from "../../utils/request"
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
const { Search } = Input;
import '@/css/common.scss'

function CityList(props) {
    const [citylist, setCityList] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    useEffect(async () => {
        const res = await request({
            url: "city",
            method: "get",
            params: {
                page,
            }
        })
        setCityList(res.data.data.data)
        setTotal(res.data.data.total)
    }, [page])

    const showUserModal = useCallback(() => {
        setVisible(() => {
            return true
        });
    }, []);

    const hideUserModal = useCallback(() => {
        setVisible(() => {
            return false
        });
    }, []);


    const ModalForm = useCallback(({ visible, onCancel }) => {

        const onOk = async () => {
            let { nm, py } = form.getFieldsValue(true)
            const res = await request({
                url: "/city",
                method: "post",
                data: {
                    nm,
                    py,
                }
            })
            if(res.data.code === 200){
                hideUserModal();
                message.success("添加成功！")
                const res = await request({
                    url: "city",
                    method: "get",
                    params: {
                        page,
                    }
                })
                setCityList(res.data.data.data)
                setTotal(res.data.data.total)
            }
        };
        

        return (
            <Modal title="添加城市" visible={visible} onOk={onOk} onCancel={onCancel}
                cancelText="取消" okText="确认"
            >
                <Form form={form} layout="vertical" name="userForm"  >
                    <Form.Item
                        name="nm"
                        label="城市名:"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="py"
                        label="城市拼音:"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }, [page]);



    const Delete = useCallback(async (id) => {
     const res =  await request({
            url: "city",
            method: "delete",
            params:{
                id,
            }
        })
        if(res.data.code ===200){
            message.success("删除成功！")
            const res = await request({
                url: "city",
                method: "get",
                params: {
                    page,
                }
            })
            setCityList(res.data.data.data)
            setTotal(res.data.data.total)
        }

    }, [page])
    const onSearch = useCallback(async value => {
        const res = await request({
            url: "citySelect",
            method: "get",
            params: {
                select: value,
            }
        })
        setTotal(res.data.data.total)
        setCityList(res.data.data.data)
    }, [])

    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selects=', selectedRowKeys, selectedRows)
        }
    }
    const columns = [
        {
            title: '#',
            dataIndex: 'title',
            render(id, record, index) {
                return (
                    <div>{index + 1}</div>
                )
            }
        },
        {
            title: '城市名',
            dataIndex: 'nm',
        },
        {
            title: '城市拼音',
            dataIndex: 'py',
        },

        {
            title: '操作',
            dataIndex: 'id',
            render: (id, record, index) => {
                return (
                    <>
                        <Button.Group size="middle" >
                            <Popconfirm placement="top" title={"你确定要删除这个城市吗？"} onConfirm={() => {
                                Delete(id)
                            }} okText="确定" cancelText="取消">
                                <Button shape="round" type="danger" icon={<CloseOutlined />}></Button>
                            </Popconfirm>
                        </Button.Group>
                    </>
                )
            }
        },

    ];
    const pagination = {
        total,
        pageSize: 10,
        position: ['bottomCenter'],
        showQuickJumper: true,
        showSizeChanger: false,
        showTotal: (total, range) => {
            return `共${total}条`
        },
        onChange: (p, pageSize) => {
            setPage(p)
        }
    }

    return (
        <div>
            <div className="search_box">
                <div className="search_left">
                    <h1>城市列表</h1>
                    <Search placeholder="城市昵称/城市id" onSearch={onSearch} enterButton />
                </div>
                <Button.Group size="middle" style={{ float: "right" }}>
                    <Button shape="round" type="primary" onClick={showUserModal} icon={<PlusOutlined />}>添加</Button>
                    <Popconfirm placement="top" title={"你确定要删除已选择的城市吗？"} onConfirm={() => {
                        Delete(record)
                    }} okText="确定" cancelText="取消">
                        <Button shape="round" type="danger" icon={<CloseOutlined />}>批量删除</Button>
                    </Popconfirm>
                </Button.Group>
            </div>
            <Table
                columns={columns}
                dataSource={citylist}
                rowKey="id"
                bordered='true'
                rowSelection={rowSelection}
                pagination={pagination}
            />
            <ModalForm visible={visible} onCancel={hideUserModal} />
        </div>
    )
}


export default CityList