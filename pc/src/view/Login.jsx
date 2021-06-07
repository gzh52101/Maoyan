import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import request from '@/utils/request'
import { Form, Input, Button, Cascader, Row, Col } from 'antd'

import 'antd/dist/antd.css'
import '../Login.scss'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


function Login() {
    const [vcode,changevcode] = useState("")
    useEffect(()=>{
       getvcode()
        
    })
    const getvcode = async () =>{
        const result = await request.get('/vcode')
        vcode = result.data
        console.log(vcode);
        changevcode(vcode)
    }
  
    const onFinish = async (value) => {
        const data = await request.post('/roleLogin', {
            ...value
        })
        if (data.code === 200) {
            console.log(0.0);
        }
    }
    
    return (
        <div className={'box'}>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="管理员账号"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '管理员账号不能为空',
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
                            message: '密码不能为空',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="验证码" extra="请确保输入无误" >
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="captcha"
                                noStyle
                                rules={[{ required: true, message: '验证码不能为空' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} onClick={changevcode} dangerouslySetInnerHTML={{__html:vcode}}>
                            
                        </Col>
                    </Row>
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" >登录</Button>
                   
                </Form.Item>
            </Form>
        </div>

    )

}

export default Login