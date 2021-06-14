import React, { useState, useEffect, useCallback } from 'react';
import { Carousel, WingBlank, WhiteSpace, Card, Grid } from 'antd-mobile';
import request from '../../utils/request';
import RecCards from '../../components/RecCards';
import Banner from '../../components/Banner';

const advHeader = [
    {
        icon: "iconfont icon-dianying",
        text: '电影影院',
        iBackground: 'linear-gradient(120deg, rgb(252,124,87) 0%, rgb(254,198,77) 100%)',
        iColor: 'rgb(254,221,228)',
    },
    {
        icon: "iconfont icon-bofang",
        text: '放映厅',
        iBackground: 'linear-gradient(120deg, rgb(254,56,72) 0%, rgb(254,83,153) 100%)',
        iColor: 'rgb(254,221,228)',
    },
    {
        icon: "iconfont icon-yinlemusic214",
        text: '演出赛事',
        iBackground: 'linear-gradient(120deg, rgb(134,41,254) 0%, rgb(221,87,254) 100%)',
        iColor: 'rgb(254,221,228)',
    },
    {
        icon: "iconfont icon-peitaosheshixiaotubiao_dianshi",
        text: '剧集综艺',
        iBackground: 'linear-gradient(120deg, rgb(43,138,254) 0%, rgb(69,205,255) 100%)',
        iColor: 'rgb(254,221,228)',
    },
];

// 轮播图数据
const bannerData = {
    data: ['banner1.png', 'banner2.png', 'banner3.png', 'banner4.png', 'banner5.png', 'banner6.png', 'banner7.png'],
}


function Recommend(props) {

    const [hotMovieData, sethotMovieData] = useState([]);
    const [hotLen, sethotLen] = useState();
    const [onMovieData, setonMovieData] = useState([]);
    const [onLen, setonLen] = useState();
    const [showData, setshowData] = useState([]);
    const [showLen, setshowLen] = useState();

    // 初始化调用
    useEffect(function () {
        getData();
    }, []);

    // 获取影片
    const getData = useCallback(async () => {
        const { data } = await request.get('/movie', { page:1, size:20, isHot: true });
        sethotMovieData(data.data);
        sethotLen(data.total);

        const { data:data2 } = await request.get('/movie', { page: 1, size: 20, isOn: true });
        setonMovieData(data2.data);
        setonLen(data2.total);

        const { data:data3 } = await request.get('/movie', {
            page: 5,
        });
        setshowData(data3.data);
        setshowLen(data3.total);
    }, []);

    return (
        <>
            <Banner bannerData={bannerData.data}></Banner>

            <Card style={{ marginTop: 10 }}>
                <Card.Body style={{ padding: '15px 10px 6px' }}>
                    <div className="adv-header">
                        {
                            advHeader.map(item => (
                                <div className="cards" key={item.text}>
                                    <div className="cards-header">
                                        <i
                                            className={item.icon}
                                            style={{
                                                backgroundImage: `${item.iBackground}`,
                                                color: `${item.iColor}`,
                                            }}
                                        ></i>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>{item.text}</div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="adv-bottom">
                        <div className="cards" style={{ background: 'url(./img/adv1.png) no-repeat 100% 100%', backgroundSize: 46 }}>
                            <h2>砍价专区</h2>
                            <span>0元观影</span>
                        </div>
                        <div className="cards" style={{ background: 'url(./img/adv2.jpg) no-repeat 100% 100%', backgroundSize: 22 }}>
                            <h2>在线观影</h2>
                            <span>限时抢券</span>
                        </div>
                        <div className="cards" style={{ background: 'url(./img/adv3.jpg) no-repeat 100% 100%', backgroundSize: 22 }}>
                            <h2>孟京辉</h2>
                            <span>经典戏剧</span>
                        </div>
                        <div className="cards" style={{ background: 'url(./img/adv1.png) no-repeat 100% 100%', backgroundSize: 46 }}>
                            <h2>周边商场</h2>
                            <span>3C周边</span>
                        </div>
                        <div className="cards" style={{ background: 'url(./img/adv2.jpg) no-repeat 105% 100%', backgroundSize: 22 }}>
                            <h2>电影榜单</h2>
                            <span>高分推荐</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <RecCards Len={hotLen} cardsData={hotMovieData} title={'正在热映'} numCount={true} haveBtn={true} btnText={'购票'} btnColor={'rgb(240,61,56)'} props={props}></RecCards>

            <RecCards Len={onLen} cardsData={onMovieData} title={'待映推荐'} numCount={true} time={true} haveBtn={true} btnText={'预售'} btnColor={'rgb(53,167,254)'} props={props}></RecCards>

            <RecCards Len={showLen} cardsData={showData} title={'精彩演出'} props={props}></RecCards>

        </>
    )
}


export default Recommend;