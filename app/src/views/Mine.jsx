import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openBox, logout } from '../store/actions/login';
import '../scss/mine.scss'
import { Toast } from 'antd-mobile';

function Mine() {

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.login);
 
    const onLogout = useCallback(() => {
        dispatch(logout());
        Toast.info('已退出登录');
    }, []);

    const onLogin = useCallback(() => {
        dispatch(openBox(true));
    }, []);

    return (
        <div className="mine-box" >
            {/* <button onClick={openLoginBox} style={{ width: 100, height: 50 }}>登录</button> */}
            <div className="mine-set">
                我的
                <div style={{ position: 'absolute', right: 20, top: '0', display: 'flex', alignItems: 'center' }}>
                    <i className="iconfont icon-lingdang" style={{ fontSize: 28, marginRight: 10 }}></i>
                    
                    {
                        userInfo ? <i onClick={onLogout} className="iconfont icon-shezhi" style={{ fontSize: 20 }}></i>:<i className="iconfont icon-shezhi" style={{ fontSize: 20 }}></i>
                    }
                </div>
            </div>

            <div className="mine-header">

                <div className="user-avator">
                    <div className="avator">
                        <img src="./img/headPortrait.jpg" alt="" />
                    </div>
                    {
                        userInfo ?  <div className="login-btn">{userInfo.nickname?userInfo.nickname:'昵称'}</div> : <div className="login-btn" onClick={onLogin}>立即登录</div>
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
                        <div className="cards-header"></div>
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
                            <div className="card" style={{justifyContent:'space-around',marginTop:10,fontSize:16}}>
                                <div style={{height:50,width:'30%',textAlign:'center',paddingTop:10,backgroundColor:'rgb(252,237,230)',borderRadius:'10px',color:'rgb(215,91,109)'}}>优惠券</div>
                                <div style={{height:50,width:'30%',textAlign:'center',paddingTop:10,backgroundColor:'rgb(248,245,230)',borderRadius:'10px',color:'rgb(216,118,69)'}}>折扣卡<p style={{fontSize:12,opacity:'0.8'}}>开卡即省</p></div>
                                <div style={{height:50,width:'30%',textAlign:'center',paddingTop:10,backgroundColor:'rgb(240,244,253)',borderRadius:'10px',color:'rgb(130,137,212)'}}>猫享卡</div>
                            </div>
                        </div>
                        <div className="cards">
                            <div className="title">
                                创作中心
                                </div>
                            <div className="card" style={{justifyContent:'space-around'}}>
                                <div className='card-item'>
                                    <i className="iconfont icon-shangchuan" style={{color:'rgb(255,78,106)'}}></i>
                                    <span>上传视频</span>
                                </div>
                                <div className='card-item'>
                                    <i className="iconfont icon-renzheng" style={{color:'rgb(255,78,106)'}}></i>
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
                                    <i className="iconfont icon-kanjia" style={{color:'rgb(249,133,58)'}}></i>
                                    <span>砍价看电影</span>
                                </div>
                                <div className='card-item'>
                                    <i className="iconfont icon-huabankaobei" style={{color:'rgb(75,159,248)'}}></i>
                                    <span>1分钱观影</span>
                                </div>
                                <div className='card-item'>
                                    <i className="iconfont icon-iconset0317" style={{color:'rgb(248,114,0)'}}></i>
                                    <span>限时购周边</span>
                                </div>
                                <div className='card-item'>
                                    <i className="iconfont icon-jiedai" style={{color:'rgb(251,183,76)'}}></i>
                                    <span>借钱\零</span>
                                </div>
                                <div className='card-item'>
                                    <i className="iconfont icon-peitaosheshixiaotubiao_dianshi" style={{color:'rgb(170,161,251)'}}></i>
                                    <span>免费看大片</span>
                                </div>
                                <div className='card-item'>
                                    <i className="iconfont icon-yinhangka" style={{color:'rgb(85,161,247)'}}></i>
                                    <span>银行活动</span>
                                </div>
                                <div className='card-item'>
                                    <i className="iconfont icon-risk-alarm_line" style={{color:'rgb(74,140,249)'}}></i>
                                    <span>票务取消险</span>
                                </div>
                            </div>
                        </div>
                        <div className="cards">
                            <div className="title" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                <span>收到一个福利<span style={{fontSize:12,color:'#999',border:'1px solid #ccc',fontWeight:'normal',display:'inline-block',padding:2,marginLeft:5}}>广告</span></span>
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