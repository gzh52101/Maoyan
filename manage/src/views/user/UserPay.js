import React, { useCallback, useEffect, useState } from 'react'
import { Input, Steps, Table, Button, message, Modal,Form,InputNumber } from 'antd';
const { Search } = Input;
const { Step } = Steps;
import { Redirect } from 'react-router-dom';
import request from '@/utils/request'
import {withAuth} from '@/utils/hoc'
import '@/css/userPay.scss'
function UserPay(props) {
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [user_id,setUserId] = useState(0)
    const [tel,setTel] = useState("");
    const [page,setPage] = useState(1)
    const [total,setTotal] = useState(0)
    useEffect( async ()=>{
        try {
            let a = props.location.query.tel
            setTel(a)
        } catch (error) {
            setTel("")
        }

        
        const res = await request({
            url: "/userSelect",
            method: "get",
            params: {
                select: tel,
                page,
            }
        })
        if(res.data.code ==200){
            setData(res.data.data.data)
            setTotal(res.data.data.total)
        }

    },[tel,page])


    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    };

    const showUserModal = useCallback((id) => {
        setVisible(() => {
            return true
        });
        setUserId(id)
    }, []);

    const hideUserModal = useCallback(() => {
        setVisible(() => {
            return false
        });
    }, []);




    const ModalForm = useCallback(({ visible, onCancel }) => {

        const onOk = async () => {
            let { money } = form.getFieldsValue(true)
         const res = await   request({
                url:"/user",
                method:"put",
                data:{
                    user_id,
                    money,
                }
            })
            if(res.data.code ===200){
                message.success("修改成功！")
                hideUserModal();
                form.resetFields();
                const res = await request({
                    url: "/userSelect",
                    method: "get",
                    params: {
                        select: tel,
                        page,
                    }
                })
                if(res.data.code ==200){
                    setData(res.data.data.data)
                    setTotal(res.data.data.total)
                }
            }else if(res.data.code == 401){
                // ReactDOM.unmountComponentAtNode(container)
                return <Redirect to="/login" />
            }
        };

        return (
            <Modal title="修改余额" visible={visible} onOk={onOk} onCancel={onCancel}
                cancelText="取消" okText="确认"
            >
                <Form form={form} layout="vertical" name="userForm" {...layout} >
                    <Form.Item
                        name="money"
                        label="余额:"
                    >
                        <InputNumber/>
                    </Form.Item>
                 </Form>
            </Modal>
        );
    }, [user_id]);

    const pagination = {
        total,
        pageSize: 10,
        position: ['bottomCenter'],
        showTotal: (total, range) => {
            return `共${total}条`
        },
        onChange: (p, pageSize) => {
            setPage(p)
        }
    }


    const onSearch = useCallback(async value => {
        var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (value == "") {
            message.error("搜索条件不能为空")
        } else {
            if (reg.test(value)) {
                const res = await request({
                    url: "/userSelect",
                    method: "get",
                    params: {
                        select: value,
                    }
                })
                if (res.data.code == 400) {
                    setData(res.data.data.data)
                    message.error("该用户不存在,请检查重输")
                } else if (res.data.code == 200) {
                    setData(res.data.data.data)
                    setTotal(res.data.data.total)
                }
            } else {
                message.error("手机号格式不正确")
            }
        }
    }, [])


    const columns = [
        {
            title: '手机号',
            dataIndex: 'tel',
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
        },
        {
            title: '余额',
            dataIndex: 'money',
        },
        {
            title: '操作',
            dataIndex: 'user_id',
            render: (id, record, index) => {
                return (
                    <Button type="primary" shape="round" size="small" onClick={()=>{
                        showUserModal(id)
                    }}>
                        修改余额
                    </Button>
                )
            }
        },
    ];


    return (
        <div>
            <h1>
                充值中心
            </h1>

            <Steps size="small" current={3}>
                <Step title="搜索用户" />
                <Step title="点击修改" />
                <Step title="充值完成" />
            </Steps>


            <Search placeholder="输入手机号搜索用户" onSearch={onSearch} enterButton style={{ marginTop: 50, width: 300 }} />


            <Table
                // rowSelection={{
                //     type: selectionType,
                //     ...rowSelection,
                // }}
                columns={columns}
                dataSource={data}
                pagination={pagination}
                rowKey="user_id"
            />
            <ModalForm visible={visible} onCancel={hideUserModal} />
        </div>
    )


}

UserPay = withAuth(UserPay)

export default UserPay
