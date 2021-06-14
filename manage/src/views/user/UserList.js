import React, { useEffect, useCallback, useState, useRef } from 'react'
import { Table, Switch, Button, Popconfirm, message, Input, Form, Modal} from 'antd';
import request from "../../utils/request"
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
const { Search } = Input;
import '@/css/common.scss'
import '@/css/userList.scss'
function UserList(props) {
    const [userlist, setUserList] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selects=', selectedRowKeys, selectedRows)
        }
    }


    const validateTel = useCallback(async (rule, value) => {
        var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (value == "") {
            return Promise.reject('手机号不能为空')
        } else {
            if (reg.test(value)) {
                const res = await request({
                    url: "/check",
                    method: "Get",
                    params: {
                        tel: value,
                    }
                })

                if (res.data.code === 400) {
                    return Promise.reject('手机号已经被注册,请更换一个')
                } else if (res.data.code === 200) {
                    return Promise.resolve()
                }
                return Promise.resolve()
            } else {
                return Promise.reject('手机号格式不正确')
            }
        }
    }, [])


    const validatePassword = useCallback(async (rule, value) => {
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
        if (value == "") {
            return Promise.reject('密码不能为空')
        } else {
            if (reg.test(value)) {

                return Promise.reject('密码长度要大于6位，由数字和字母组成')
            } else {

                return Promise.resolve()
            }
        }

    }, [])
    const validatePasswords = useCallback(async (rule, value) => {
        const { password } = form.getFieldsValue(true)
        if (value == "") {
            return Promise.reject('与上面密码不一样')
        } else {
            if (password === value) {
                return Promise.resolve()
            } else {

                return Promise.reject('与上面密码不一样')
            }
        }

    }, [])



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

    const useResetFormOnCloseModal = ({ form, visible }) => {
        const prevVisibleRef = useRef();
        useEffect(() => {
            prevVisibleRef.current = visible;
        }, [visible]);
        const prevVisible = prevVisibleRef.current;
        useEffect(() => {
            if (!visible && prevVisible) {
                form.resetFields();
            }
        }, [visible]);
    };


    const ModalForm = ({ visible, onCancel }) => {

        useResetFormOnCloseModal({
            form,
            visible,
        });

        const onOk = async () => {
            form.submit();
            let { tel, password,role } = form.getFieldsValue(true)
            role = role?1:0
            const res = await request({
                url: "user",
                method: 'post',
                data: {
                    tel,
                    password,
                    role,
                }
            })
            if(res.data.code === 200){
                message.success("添加成功！")
                setPage(1);
                onCancel();
                form.resetFields();
            }


        };

        return (
            <Modal title="添加用户" visible={visible} onOk={onOk} onCancel={onCancel}
                cancelText="取消" okText="添加"
            >
                <Form form={form} layout="vertical" name="userForm"  >
                    <Form.Item
                        name="tel"
                        label="手机号"
                        validateTrigger={["onBlur"]}
                        rules={[
                            {
                                validator: validateTel,
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        validateTrigger={["onBlur"]}
                        rules={[
                            {
                                validator: validatePassword,
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="passwords"
                        label="确认密码"
                        validateTrigger={["onBlur"]}
                        rules={[
                            {
                                validator: validatePasswords,
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="是否是管理员" valuePropName="checked" name="role">
                        <Switch/>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };



    const onChange = useCallback((checked, user_id) => {
        let role = checked ? 1 : 0
        request.put("/user", {
            user_id,
            role,
        }).then(res => {
            if (res.data.code === 200) {
                message.success("修改成功！")
            }
        })
    }, [])

    useEffect(async () => {
            get_list();
    }, [page])

    useEffect(()=>{
        return ()=>{
            get_list =null
        }   
    },[])



    const pagination = {
        total,
        pageSize: 10,
        position: ['bottomCenter'],
        showSizeChanger:false,
        showTotal: (total, range) => {
            return `共${total}条`
        },
        onChange: (p, pageSize) => {
            setPage(p)
        }
    }

    const to_edit = useCallback((record)=>{
        
        props.history.push({
            pathname: '/index/UserPay',
            query: { tel :record.tel } 
        })
    },[])

    const onSearch = useCallback(async value => {
        const res = await request({
            url: "/userSelect",
            method: "get",
            params: {
                select: value
            }
        })
        setUserList(res.data.data.data)
        setTotal(res.data.data.total)
    }, [])
    let get_list = useCallback(async () => {
        const res = await request({
            method: "get",
            url: "/user",
            params: {
                page,
            }
        })
        setUserList(res.data.data.data)
        setTotal(res.data.data.total)
    }, [page])

    const Delete = useCallback(async (id) => {

        const res = await request({
            url: "/user",
            method: "DELETE",
            params: {
                user_id:id,
            }
        })
        if (res.data.code === 200) {
            message.success("删除成功！")
            get_list()
        }

    }, [page])

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
            title: '昵称',
            dataIndex: 'nickname',
        },
        {
            title: '手机号',
            dataIndex: 'tel',
        },
        {
            title: '性别',
            dataIndex: 'sex',
        },
        {
            title: '余额',
            dataIndex: 'money',
        },
        {
            title: '管理员',
            dataIndex: 'role',
            key: 'user_id',
            render: (id, record, index) => {
                return (
                    <Switch defaultChecked={id} onChange={(checked) => {
                        onChange(checked, record.user_id)
                    }} />
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'user_id',
            render: (id, record, index) => {
                return (
                    <>
                        <Button.Group size="middle" >
                            <Button shape="round" type="primary" onClick={()=>{
                                to_edit(record);
                            }} icon={<EditOutlined />}></Button>
                            <Popconfirm placement="top" title={"你确定要删除这个用户吗？"} onConfirm={() => {
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

    return (
        <div>
            <div className="search_box">
                <div className="search_left">
                    <h1>用户列表</h1>
                    <Search placeholder="用户昵称/手机号" onSearch={onSearch} enterButton />
                </div>
                <Button.Group size="middle" style={{ float: "right" }}>
                    <Button shape="round" type="primary" onClick={showUserModal} icon={<PlusOutlined />}>添加</Button>
                    <Popconfirm placement="top" title={"你确定要删除已选择的用户吗？"} onConfirm={() => {
                        Delete(record)
                    }} okText="确定" cancelText="取消">
                        <Button shape="round" type="danger" icon={<CloseOutlined />}>批量删除</Button>
                    </Popconfirm>
                </Button.Group>

            </div>
            <Table
                columns={columns}
                dataSource={userlist}
                rowKey="user_id"
                bordered='true'
                rowSelection={rowSelection}
                pagination={pagination}
            />
            <ModalForm visible={visible} onCancel={hideUserModal} />
        </div>
    )
}

export default UserList