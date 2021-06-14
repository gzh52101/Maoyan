import React, { useCallback, useState,useRef, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openBox, logout } from '../store/actions/login';
import '../scss/mine.scss'
import { Toast, Switch, Button } from 'antd-mobile';
import { apiUrl, baseUrl } from '../utils/request';
const setBoxData = [
    {
        title: 'wifi环境自动播放',
        isSwitch: false,
    },
    {
        title: '移动流量自动播放',
        isSwitch: false,
    },
    {
        title: '被赞提醒',
        isSwitch: true,
    },
    {
        title: '问答邀请提醒',
        isSwitch: true,
    },
    {
        title: '短评回复提醒',
        isSwitch: true,
    },
    {
        title: '明星应援签到提醒',
        isSwitch: false,
    },
    {
        title: '系统通知',
        isSwitch: true,
    },
    {
        title: '个性化推荐',
        isSwitch: true,
    },
]

function Mine() {


    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.login);

    const [gosetBox, setGosetBox] = useState(false);

    const onLogout = useCallback(() => {
        setGosetBox(!gosetBox);
    }, [gosetBox]);

    const [mineTitle,setMineTtitle] = useState(false);
    const mineBox = useRef();
    
    // mine-box滚动事件
    let handleScroll = function(){
        if(mineBox.current){
            if(mineBox.current.scrollTop>0){
                setMineTtitle(true);
            }else{
                setMineTtitle(false);
            }
        }
    }
    
    // 绑定监听mine-box滚动条
    useEffect(()=>{
        if(mineBox.current){
            mineBox.current.addEventListener("scroll",handleScroll)
            handleScroll()
        }
    });

    
    const userLogout = useCallback(() => {
        setGosetBox(!gosetBox);
        dispatch(logout());
        Toast.info('已退出登录',0.5);
    }, [gosetBox]);

    const onLogin = useCallback(() => {
        dispatch(openBox(true));
    }, []);



    return (
        gosetBox ?
            <div className='set-box'>
                <div className="set-header" style={{ textAlign: 'left', padding: '0 20px' }
                }>
                    <span onClick={onLogout}>&lt;</span>
                    <span style={{ marginLeft: 20, borderLeft: '1px solid rgb(192,37,33)', paddingLeft: 20 }}>设置</span>
                </div >

                <div className="set-main">

                    <div className='set-item'>
                        <div className="item-tr" style={{ border: 'none' }}>
                            <span className='item-left'>账号与安全</span>
                            <span className='item-right'>手机绑定与更换&nbsp;&gt;</span>
                        </div>
                    </div>

                    <div className='set-item'>
                        {
                            setBoxData.map((item, index) => (
                                <div className="item-tr" key={item.title}>
                                    <span className='item-left'>{item.title}</span>
                                    <span className='item-right'>
                                        <Switch
                                            checked={item.isSwitch}
                                            platform="ios"
                                            color="red"
                                        />
                                    </span>
                                </div>
                            ))
                        }
                        <div className="item-tr">
                            <span className='item-left'>清空缓存</span>
                            <span className='item-right'>&gt;</span>
                        </div>

                    </div>

                    <div className='set-item'>
                        <div className="item-tr">
                            <span className='item-left'>猫眼用户满意度调查</span>
                            <span className='item-right'>&gt;</span>
                        </div>
                        <div className="item-tr">
                            <span className='item-left'>去给猫眼电影打个分</span>
                            <span className='item-right'>&gt;</span>
                        </div>
                        <div className="item-tr">
                            <span className='item-left'>图片浏览设置</span>
                            <span className='item-right'>&gt;</span>
                        </div>
                        <div className="item-tr">
                            <span className='item-left'>检查新版本</span>
                            <span className='item-right'>&gt;</span>
                        </div>
                        <div className="item-tr">
                            <span className='item-left'>诊断网络</span>
                            <span className='item-right'>&gt;</span>
                        </div>
                        <div className="item-tr">
                            <span className='item-left'>关于</span>
                            <span className='item-right'>&gt;</span>
                        </div>
                    </div>

                    <Button type="warning" onClick={userLogout} style={{ margin: '20px auto 0px', height: 40, lineHeight: '40px', width: '90%' }}>退出登录</Button>
                </div>
            </div >
            :
            <div className="mine-box" ref={mineBox}>
                <div className="mine-set">
                   
                    {
                        userInfo ? 
                        (mineTitle ? 
                            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',paddingLeft:20}}>
                <img src={userInfo.avatar?`${baseUrl}/static/avatar/${userInfo.avatar}`:require("../../public/img/headPortrait.jpg").default} alt="" style={{width:32,height:32,borderRadius:'50%',marginRight:10}}/>
                                <span>{userInfo.nickname ? userInfo.nickname : '昵称'}</span>
                            </div>
                            :
                            ''
                        )
                        : 
                        (mineTitle ? '我的':'') 
                    }
                    <div style={{ position: 'absolute', right: 20, top: '0', display: 'flex', alignItems: 'center' }}>
                        <i className="iconfont icon-lingdang" style={{ fontSize: 28, marginRight: 10 }}></i>

                        {
                            userInfo ? <i onClick={onLogout} className="iconfont icon-shezhi" style={{ fontSize: 20 }}></i> : <i className="iconfont icon-shezhi" style={{ fontSize: 20 }}></i>
                        }
                    </div>
                </div>

                <div className="mine-header">

                    <div className="user-avator">
                        <div className="avator">
                            {
                                userInfo ?
                                <img src={userInfo.avatar?`${baseUrl}/static/avatar/${userInfo.avatar}`:require("../../public/img/headPortrait.jpg").default} alt="" />
                                :
                                <img src="./img/headPortrait.jpg" alt="" />
                            }
                        </div>
                        {
                            userInfo ?
                             <div className="login-btn" style={{display:'flex',flexDirection:'column'}}>
                                 <span>{userInfo.nickname ? userInfo.nickname : '昵称'}</span>
                                <span style={{fontSize:12,background:'rgb(254,93,101)',padding:2,borderRadius:'10px',marginTop:5}}>普通会员&nbsp;&gt;</span> 
                             </div> 
                             : 
                             <div className="login-btn" onClick={onLogin}>立即登录</div>
                        }
                    </div>

                    <div className="user-action">
                        <div style={{ display: 'flex', justifyContent: 'space-around', borderRight: '1px solid rgba(230,230,230,0.2)' }}>
                            <i className='iconfont icon-user11'></i>
                            <span>个人主页</span>
                            <span>&gt;</span></div>
                        <div className='look'>想看&nbsp;-</div>
                        <div>看过&nbsp;-</div>
                    </div>

                    <div className='mine-content'>

                        <div className="cards">
                            <div className="title">我的订单</div>
                            <div className="card">
                                <div className="card-item">
                                    <i className='iconfont icon-dianying' style={{ color: 'rgb(210,85,86)' }}></i>
                                    <span>电影票</span>
                                </div>
                                <div className="card-item">
                                    <i className='iconfont icon-yinlemusic214' style={{ color: 'purple' }}></i>
                                    <span>演出票</span>
                                </div>
                                <div className="card-item">
                                    <i className='iconfont icon-player' style={{ color: 'greenyellow' }}></i>
                                    <span>在线观影</span>
                                </div>
                                <div className="card-item">
                                    <i className='iconfont icon-iconset0317' style={{ color: 'skyblue' }}></i>
                                    <span>周边</span>
                                </div>
                            </div>
                        </div>

                        <div className="mine-main">
                            <div className="cards">
                                <div className="title">
                                    卡券中心
                                </div>
                                <div className="card" style={{ justifyContent: 'space-around', marginTop: 10, fontSize: 16 }}>
                                    <div style={{ height: 50, width: '30%', textAlign: 'center', paddingTop: 10, backgroundColor: 'rgb(252,237,230)', borderRadius: '10px', color: 'rgb(215,91,109)' }}>优惠券</div>
                                    <div style={{ height: 50, width: '30%', textAlign: 'center', paddingTop: 10, backgroundColor: 'rgb(248,245,230)', borderRadius: '10px', color: 'rgb(216,118,69)' }}>折扣卡<p style={{ fontSize: 12, opacity: '0.8' }}>开卡即省</p></div>
                                    <div style={{ height: 50, width: '30%', textAlign: 'center', paddingTop: 10, backgroundColor: 'rgb(240,244,253)', borderRadius: '10px', color: 'rgb(130,137,212)' }}>猫享卡</div>
                                </div>
                            </div>
                            <div className="cards">
                                <div className="title">
                                    创作中心
                                </div>
                                <div className="card" style={{ justifyContent: 'space-around' }}>
                                    <div className='card-item'>
                                        <i className="iconfont icon-shangchuan" style={{ color: 'rgb(255,78,106)' }}></i>
                                        <span>上传视频</span>
                                    </div>
                                    <div className='card-item'>
                                        <i className="iconfont icon-renzheng" style={{ color: 'rgb(255,78,106)' }}></i>
                                        <span>猫眼号认证</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cards">
                                <div className="title">
                                    热门活动
                                </div>
                                <div className="card">
                                    <div className='card-item'>
                                        <i className="iconfont icon-kanjia" style={{ color: 'rgb(249,133,58)' }}></i>
                                        <span>砍价看电影</span>
                                    </div>
                                    <div className='card-item'>
                                        <i className="iconfont icon-huabankaobei" style={{ color: 'rgb(75,159,248)' }}></i>
                                        <span>1分钱观影</span>
                                    </div>
                                    <div className='card-item'>
                                        <i className="iconfont icon-iconset0317" style={{ color: 'rgb(248,114,0)' }}></i>
                                        <span>限时购周边</span>
                                    </div>
                                    <div className='card-item'>
                                        <i className="iconfont icon-jiedai" style={{ color: 'rgb(251,183,76)' }}></i>
                                        <span>借钱\零</span>
                                    </div>
                                    <div className='card-item'>
                                        <i className="iconfont icon-peitaosheshixiaotubiao_dianshi" style={{ color: 'rgb(170,161,251)' }}></i>
                                        <span>免费看大片</span>
                                    </div>
                                    <div className='card-item'>
                                        <i className="iconfont icon-yinhangka" style={{ color: 'rgb(85,161,247)' }}></i>
                                        <span>银行活动</span>
                                    </div>
                                    <div className='card-item'>
                                        <i className="iconfont icon-risk-alarm_line" style={{ color: 'rgb(74,140,249)' }}></i>
                                        <span>票务取消险</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cards">
                                <div className="title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>收到一个福利<span style={{ fontSize: 12, color: '#999', border: '1px solid #ccc', fontWeight: 'normal', display: 'inline-block', padding: 2, marginLeft: 5 }}>广告</span></span>
                                    <span>&gt;</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>


            </div>
    )
}

export default Mine;