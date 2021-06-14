import React,{useState, useCallback,useEffect} from 'react';
import '../scss/index.scss';
import {Switch,Route,Redirect} from 'react-router-dom';

import { TabBar } from 'antd-mobile';
import Home from './Home';
import Movie from './Movie';
import Video from './Video';
import Show from './Show';
import Mine from './Mine';

function Index(props) {
    
    let nav = [
        {
            title: "首页",
            key: "/home",
            icon: <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/Home.png) center center /  21px 21px no-repeat'
            }}></div>,
            selectedIcon:   <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/logo.png) center center /  21px 21px no-repeat'
            }}></div>
        },
        {
            title: "电影/影院",
            key: "/movie",
            icon: <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/movie.png) center center /  21px 21px no-repeat'
            }}></div>,
            selectedIcon:   <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/movie_active.png) center center /  21px 21px no-repeat'
            }}></div>
        },
        {
            title: "小视频",
            key: "/video",
            icon: <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/video.png) center center /  21px 21px no-repeat'
            }}></div>,
            selectedIcon:   <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/video_active.png) center center /  21px 21px no-repeat'
            }}></div>
        },
        {
            title: "演出",
            key: "/show",
            icon: <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/show.png) center center /  21px 21px no-repeat'
            }}></div>,
            selectedIcon:   <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/show_active.png) center center /  21px 21px no-repeat'
            }}></div>
        },
        {
            title: "我的",
            key: "/mine",
            icon: <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/my.png) center center /  21px 21px no-repeat'
            }}></div>,
            selectedIcon:   <div style={{
                width: '22px',
                height: '22px',
                background: 'url(./icon/nav/my_active.png) center center /  21px 21px no-repeat'
            }}></div>
        },
    ];

    const {history,match,location} = props;

    // 当前路由
    const [currentMenu, setCurrentMenu] = useState(`${location.pathname === '/index' ? '/home':"/"+`${location.pathname}`.split('/')[2]}`);
    
    const clickNav = useCallback(function(title,key){
        history.push(match.path+key);
    },[]);

    useEffect(function(){
        history.listen(location=>{
            setCurrentMenu("/"+`${location.pathname}`.split('/')[2]);
        });

    },[]);

    useEffect(() => {
        return () => {
            setCurrentMenu(null)
        }
    },[])

    return (
        <div className="index-box">
            
            <div className="content">
                <Switch>
                    <Route path={match.path + "/home"} component={Home}></Route>
                    <Route path={match.path + "/movie"} component={Movie}></Route>
                    <Route path={match.path + "/video"} component={Video}></Route>
                    <Route path={match.path + "/show"} component={Show}></Route>
                    <Route path={match.path + "/mine"} component={Mine}></Route>
                    <Redirect from={match.path + "/"} to={match.path + "/home"} exact/>
                </Switch>

            </div>
            
            <div className="bottom-nav">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#d81e06"
                    barTintColor="white"
                >
                    {
                        nav.map(item=>{ 
                            return <TabBar.Item
                                title={item.title}
                                key={item.key}
                                icon={item.icon}
                                selectedIcon={item.selectedIcon}
                                selected={currentMenu === item.key}
                                onPress={clickNav.bind(null,item.title,item.key)}
                            >
                            </TabBar.Item>
                        })  
                    }
                </TabBar>
            </div>
        </div>
    )
}

export default Index;