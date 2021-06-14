import React, { useEffect, useCallback, useState, } from 'react'
import { Form, Input, Button, DatePicker, InputNumber, Upload, message, Switch,Select } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import '@/css/movieAdd.scss'
import request from '../../utils/request';

function MovieAdd(p) {


    const [imageUrl, setImgUrl] = useState("")
    const [img, setImg] = useState("");
    const [imglist, setImgList] = useState([])
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 12,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 4,
            span: 16,
        },
    };

    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                fileList = fileList.map(item => item.originFileObj)
                setImgList(fileList)
            }
        },
        defaultFileList: [
        ],
    };



    //封面图
    const getBase64 = useCallback((img) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setImgUrl(reader.result)
        });
        reader.readAsDataURL(img);
    }, [imageUrl])





    const handleChange = useCallback(info => {
        setImg(info.target.files[0])

        if (info.target.files[0].size > 1024 * 1024 * 5) {
            message.error("图片超过了5M,请换张图片")
            return
        }

        if (info.target.files[0]) {
            getBase64(info.target.files[0]);
        }
    }, [imageUrl])

    const onFinish = useCallback(async (values) => {
        
        let { cat, dir, dra, dur, enm, isHot, isOn, money, nm, pubDesc,select,star } = values
        isOn = isOn ? 1 : 0
        isHot = isHot ? 1 : 0
        pubDesc = pubDesc.format("YYYY-MM-DD HH:mm:ss") +select+"上映"

        if (!Boolean(img)) {
            message.error("至少上传一张封面图")
        }
        if (imglist.length <= 0) {
            message.error("至少上传一张剧组照")
        }

        if (Boolean(img) && imglist.length > 0) {
            cat, dir, dra, dur, enm, isHot, isOn, money, nm, pubDesc
            const fda = new FormData();
            fda.set("nm", nm)
            fda.set("cat", cat)
            fda.set("dir", dir)
            fda.set("dra", dra)
            fda.set("dur", dur)
            fda.set("enm", enm)
            fda.set("isHot", isHot)
            fda.set("isOn", isOn)
            fda.set("money", money)
            fda.set("pubDesc", pubDesc)
            fda.set("star", star)
            let arr = [img, ...imglist]

            arr.forEach(item => {
                fda.append("photos", item)
            })
            const res = await request({
                url: "movie",
                method: "post",
                data: fda,
            })

            console.log(res);
            if(res.data.code ===200){
                message.success("添加成功!")
                setTimeout(()=>{
                    p.history.go(0)
                },1000)
            }

        }




    }, [img, imglist])
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>点击上传</div>
        </div>
    );
    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Please select time!',
            },
        ],
    };
    return (
        <div>
            <h1>添加影片</h1>

            <Form
            form={form}
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="电影名称"
                    name="nm"
                    rules={[
                        {
                            required: true,
                            message: '请输入电影名称!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="副标题"
                    name="enm"
                    rules={[
                        {
                            required: true,
                            message: '请输入你的副标题',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="电影类别"
                    name="cat"
                    rules={[
                        {
                            required: true,
                            message: '请输入电影的类别',
                        },
                    ]}
                >
                    <Input placeholder="输入电影类别以逗号隔开，如：动作，冒险" />
                </Form.Item>

                <Form.Item
                    label="导演名"
                    name="dir"
                    rules={[
                        {
                            required: true,
                            message: '请输入演员名',
                        },
                    ]}
                >
                    <Input placeholder="导演名，多个以逗号隔开" />
                </Form.Item>
                <Form.Item label="Select" name="select"
                    rules={[
                        {
                            required: true,
                            message: '请选择上映地点',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="中国大陆">中国大陆</Select.Option>
                        <Select.Option value="中国香港">中国香港</Select.Option>
                        <Select.Option value="中国台湾">中国台湾</Select.Option>
                        <Select.Option value="外国">外国</Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item
                    label="主演名"
                    name="star"
                    rules={[
                        {
                            required: true,
                            message: '请输入演员名',
                        },
                    ]}
                >
                    <Input placeholder="演员名，以逗号隔开 如:刘德华,张学友" />
                </Form.Item>


                <Form.Item name="pubDesc" label="上映时间" {...config}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>

                <Form.Item name="isHot" label="是否设置热门" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item name="isOn" label="是否设置待上映" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="电影时长"
                    name="dur"
                    rules={[
                        {
                            required: true,
                            message: '请输入电影时长',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="money"
                    label="电影票售价"
                    rules={[
                        {
                            required: true,
                            message: '请输入票价',
                        },
                    ]}

                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="dra"
                    label="电影简介"
                    rules={[
                        {
                            required: true,
                            message: '请输入电影的简介',
                        },
                    ]}

                >
                    <Input.TextArea style={{ resize: 'none', height: 200 }} />
                </Form.Item>


                <Form.Item label="电影封面图">
                    <div className="up_file_box">
                        <input type="file" className="up_file" onChange={handleChange} />
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </div>
                </Form.Item>

                <Form.Item label="剧组照">
                    <Upload {...props} maxCount={9}>
                        <Button icon={<UploadOutlined />}>点击上传</Button>
                    </Upload>,
                </Form.Item>

                <Form.Item wrapperCol={{ span: 10, offset: 6 }}>

                    <Button type="primary" htmlType="submit" size="large" style={{ width: 400 }}>
                        添加影片
        </Button>
                </Form.Item>
            </Form>

        </div>
    )
}


export default MovieAdd