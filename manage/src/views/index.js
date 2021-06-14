import React,{useState,useEffect,useCallback} from 'react'
import { Layout, Button, Menu } from 'antd';
const { Header, Sider } = Layout;
const { SubMenu } = Menu;
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/user'
import '@/css/index.scss'
import { Route, Redirect, Switch } from 'react-router-dom'
import UserList from './user/UserList'
import UserPay from './user/UserPay'
import CityList from './city/CityList'
import MovieList from './movie/MovieList'
import MovieAdd from './movie/MovieAdd'

const meau = [
    {
        key: "user",
        text: "用户管理",
        Children: [
            {
                text: "用户列表",
                key: "/index/userList"
            },

            {
                text: "用户充值",
                key: "/index/UserPay"
            }
        ]
    },
    {
        key: "movie",
        text: "影片管理",
        Children: [
            {
                text: "影片列表",
                key: "/index/MovieList"
            },
            {
                text: "添加影片",
                key: "/index/MovieAdd"
            }
        ]
    },
    {
        key: "city",
        text: "城市管理",
        Children: [
            {
                text: "城市列表",
                key: "/index/CityList"
            }
        ]
    },
]



function home(props) {

    const [key,setKey] = useState(`${props.location.pathname}`);

    useEffect(()=>{
        listen();
    },[])
      
    useEffect(()=>{
        return ()=>{
            listen =null
        }   
    },[])  

  let listen = props.history.listen((history)=>{
        setKey(history.pathname)
    })


   

    
    let userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const tuichu = () => {
        dispatch(logout());
    }

    const to_login = () => {
        props.history.push("/login")
    }
    const handleClick = e => {

        // setKey(e.key)
        props.history.push(e.key)
    };


    return (
        <div className="index_box">
            <Layout >
                <Header className="header" style={{ backgroundColor: '#fffff' }}>
                    <div className="title">
                        <span >猫眼后台管理系统</span>
                        {
                            userInfo ?
                                <div>
                                    <span style={{ color: '#fff', fontSize: 15 }}>{userInfo.nickname}</span>
                                    <Button type="link" className="logout" onClick={tuichu}>退出登录</Button>
                                </div>
                                :
                                <Button type="link" size="large" onClick={to_login}>登录</Button>
                        }
                    </div>

                </Header>
            </Layout>


            <div className="meau">
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}  >
                        <Menu
                            mode="inline"
                            selectedKeys={key}
                            defaultSelectedKeys={"/index/UserPay"}
                            defaultOpenKeys={['user', 'movie', 'city']}
                            onClick={handleClick}
                            style={{ height: '100%' }}
                        >
                            {
                                meau.map(item => {
                                    return (
                                        <SubMenu key={item.key} title={item.text}>
                                            {
                                                item.Children.map(item => {
                                                    return (
                                                        <Menu.Item key={item.key}>{item.text}</Menu.Item>
                                                    )
                                                }
                                                )
                                            }

                                        </SubMenu>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <div className="content">
                        <Switch>
                            <Route path="/index/userList" component={UserList} />
                            <Route path="/index/UserPay" component={UserPay} />
                            <Route path="/index/CityList" component={CityList} />
                            <Route path="/index/MovieList" component={MovieList} />
                            <Route path="/index/MovieAdd" component={MovieAdd} />
                            <Redirect path="/index" to="/index/userList" exact/>
                            
                        </Switch>
                    </div>
                </Layout>

            </div>
        </div>
    )
}


export default home