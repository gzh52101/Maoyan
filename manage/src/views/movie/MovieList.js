import React, { useEffect, useCallback, useState, } from 'react'
import { Table, Button, Popconfirm, message, Input,Switch  } from 'antd';
import request,{baseUrl} from "../../utils/request"
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
const { Search } = Input;
import '@/css/common.scss'

function MovieList(props) {
    const [movielist, setMovieList] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [cat, setCat] = useState("")
    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selects=', selectedRowKeys, selectedRows)
        }
    }


    const to_add =()=>{
        props.history.push("/index/MovieAdd")
    }

    useEffect(() => {
        get_movielist();
    }, [page])

    const chang_On = useCallback(async (record)=>{
            let {isOn,id} =record
            isOn = isOn?0:1
        const res = await   request({
                url:"movie",
                method:"put",
                data:{
                    isOn,
                    id,
                }
            })      
            if(res.data.code === 200){
                message.success("修改成功！")
            }
    },[])

    const chang_Hot = useCallback(async (record)=>{
        let {isHot,id} =record
        isHot = isHot?0:1
    const res = await   request({
            url:"movie",
            method:"put",
            data:{
                isHot,
                id,
            }
        })      
        if(res.data.code === 200){
            message.success("修改成功！")
        }
},[])

    const get_movielist = useCallback(async () => {
        const res = await request({
            url: "/movie",
            method: "get",
            params: {
                page,
                cat,
            }
        })
        setMovieList(res.data.data.data)
        setTotal(res.data.data.total)

    }, [page])



    const columns = [
        {
            title: '导演',
            dataIndex: 'dir',
        },
        {
            title: '封面图',
            dataIndex: 'img',
            render: (record) => 
                record.includes("http")?<img src={record} width="100px" alt=""/>:
                <img src={`${baseUrl}/static/photos/${record}`} width="100px" alt=""/> 
            },

        {
            title: '影片名',
            dataIndex: 'nm',
        },
        {
            title: '影片分类',
            dataIndex: 'cat',
        },
        {
            title: '是否待上映',
            dataIndex: 'isOn',
            render: (id, record, index) => {
                return (
                    <Switch defaultChecked={Boolean(id)}onChange={()=>{
                        chang_On(record)
                    }} />
                )
            }
        },
        {
            title: '是否热门',
            dataIndex: 'isHot',
            render: (id, record, index) => {
                return (
                    <Switch defaultChecked={Boolean(id)} onChange={()=>{
                        chang_Hot(record)
                    }}/>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: (id, record, index) => {
                return (
                    <>
                        <Button.Group size="middle" >
                        <Button shape="round" type="primary" icon={<EditOutlined />}></Button>
                            <Popconfirm placement="top" title={"你确定要删除这个影片吗？"} onConfirm={() => {
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

    const Delete = useCallback(async (id) => {
        const res = await request({
            url: "movie",
            method: "delete",
            params: {
                id,
            }
        })
        if (res.data.code === 200) {
            message.success("删除成功！")
          get_movielist()
        }

    }, [page])


    const onSearch = useCallback(async value => {
        const res = await request({
            url: "movieSelect",
            method: "get",
            params: {
                select: value,
            }
        })
        setTotal(res.data.data.total)
        setMovieList(res.data.data.data)
        setCat(value)
    }, [cat])



    return (
        <div>
            <div className="search_box">
                <div className="search_left">
                    <h1>城市列表</h1>
                    <Search placeholder="电影昵称/城市分类" onSearch={onSearch} enterButton />
                </div>
                <Button.Group size="middle" style={{ float: "right" }}>
                    <Button shape="round" type="primary"  icon={<PlusOutlined />} onClick={to_add}>添加</Button>
                    <Popconfirm placement="top" title={"你确定要删除已选择的电影吗？"} onConfirm={() => {
                        Delete(record)
                    }} okText="确定" cancelText="取消">
                        <Button shape="round" type="danger" icon={<CloseOutlined />}>批量删除</Button>
                    </Popconfirm>
                </Button.Group>
            </div>

            <Table
                columns={columns}
                dataSource={movielist}
                rowKey="id"
                bordered='true'
                rowSelection={rowSelection}
                pagination={pagination}
            />

        </div>
    )
}

export default MovieList