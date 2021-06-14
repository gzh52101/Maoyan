import React, { useState, useCallback, useRef, useEffect } from 'react';
import { PullToRefresh, Button } from 'antd-mobile';
import ReactDOM from 'react-dom';
import '../scss/video.scss'
function Video() {
    const [videoPlay, setVideoPlay] = useState(false);
    const video = useRef(null)

    return (
        <div className="video_box">
                <div className="video_main">
                    <div className="shipin">
                        <video src="https://vod.pipi.cn/d5457264vodtranscq1251246104/434f04463701925919031339538/v.f42905.mp4" width="400" height="100%" loop="loop" ref={video} x5-video-orientation="portraint" onClick={() => {
                            if (!videoPlay) {
                                video.current.play();
                                setVideoPlay(true)
                            } else {
                                video.current.pause();
                                setVideoPlay(false)
                            }
                        }}></video>
                    {  videoPlay?<div></div>:
                    <div className="video_btn">
                        <button className=" iconfont icon-icon_play"onClick={() => {
                            if (!videoPlay) {
                                video.current.play();
                                setVideoPlay(true)
                            } else {
                                video.current.pause();
                                setVideoPlay(false)
                            }
                        }}/>
                        </div>}
                        <div className="tips">
                            <i className='iconfont icon-gengduo'></i>
                            <ul>
                                <li> <img src={require("../../public/img/adv2.jpg").default} alt="" /> <span>+</span></li>
                                <li> <i className="iconfont icon-dianzan"></i> <p>52</p> </li>
                                <li><i className="iconfont icon-53pinglun-"></i><p>评论</p> </li>
                                <li><i className="iconfont icon-fenxiang"></i><p>分享</p> </li>
                            </ul>
                        </div>

                        <div className="title">
                            <span>@先声互动</span>
                            <span>当你说我配不上你，我就把自己吃胖40斤！</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Video;