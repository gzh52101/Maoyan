import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux'
import '@/css/login.scss'
import request from '@/utils/request'
import { login } from '../store/actions/user'
const  fields = [
    {
        name: 'tel',
        value: ''
    }, {
        name: 'password',
        value: ''
    }, {
        name: 'vcode',
        value: ''
    }
]

function Login(props) {

    const dispatch = useDispatch();
    const code_input = useRef(null)
    const [form] = Form.useForm();
    const [vcode, changeVcode] = useState("");
    useEffect(() => {
            get_vcode();
    },[])



    let get_vcode = useCallback(async () => {
        const result = await request.get("/vcode")
        //  console.log(result.data.data);
        var str = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="25" `;
        var str2 = result.data.data.substring(str.length);
        str = str + str2
            changeVcode(str)
    },[vcode])



    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 10,
            span: 16,
        },
    };



    const onFinish = useCallback(async (values) => {
        const result = await request.post("/roleLogin", { ...values })
        if (result.data.code === 200) {
            message.success("登录成功！")
            dispatch(login(result.data.data));
            props.history.push("/index");
        } else if (result.data.code === 401) {
            form.setFieldsValue({ vcode: "" })
            code_input.current.input.focus();
            message.error("验证码错误，请重输")
        } else if (result.data.code === 400) {
            message.error("账号或者密码错误，请重输")
        }
    }, [])


    return (
        <div className="login_box">
            <Form
                form={form}
                {...layout}
                name="basic"
                // initialValues={{
                //     remember: true,
                // }}
                fields={fields}
                onFinish={onFinish}
            >
                <Form.Item
                    label="手机号"
                    name="tel"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的管理员手机号',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的管理员密码',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="验证码"
                    name="vcode"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
                >
                    <Input ref={code_input} addonAfter={<span onClick={get_vcode} dangerouslySetInnerHTML={{ __html: vcode }}></span>} />
                </Form.Item>


                <Form.Item {...tailLayout} >
                    <Button type="primary" htmlType="submit" size="large" shape="round" style={{ width: 200 }}>
                        登录
        </Button>
                </Form.Item>
            </Form>
        </div>
    )
}


export default Login