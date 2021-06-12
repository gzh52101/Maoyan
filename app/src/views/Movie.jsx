import React, { useState, useCallback, useEffect } from 'react';
import '../scss/movie.scss';
import { Tabs } from 'antd-mobile';
import Banner from '../components/Banner';
import request from '../utils/request';
import MovieCard from '../components/MovieCard';
import RecCards from '../components/RecCards';

// 轮播图数据
const bannerData = {
    data: ['banner1.png', 'banner2.png', 'banner3.png', 'banner4.png', 'banner5.png', 'banner6.png', 'banner7.png'],
}

function Movie() {
    const [hotMovieData, sethotMovieData] = useState([]);
    const [onMovieData, setonMovieData] = useState([]);

    const [movieContentBox, setmovieContentBox] = useState();

    // 初始化调用
    useEffect(function () {
        getData('热映');
        setmovieContentBox('热映');
    }, []);

    let tabs = [
        {
            title: '热映',
            content: <div className="movie-main" key=''>
                <div className="hotMovie">
                    <Banner bannerData={bannerData.data}></Banner>
                    <div className="movie-data">
                        <div className="movie-data-left">
                            <i className='iconfont icon-shuju' style={{ marginRight: 5 }}></i>
                            实时票房
                        </div>
                        <div className="movie-data-right">
                            今日大盘
                            <span style={{ color: 'red', margin: 5, fontSize: 16 }}>14739.2万</span>
                            &gt;
                        </div>
                    </div>

                    <MovieCard
                        cardsData={hotMovieData}
                        btnCol={'rgb(235, 50, 62)'}
                        btnTxt={'购票'}
                        score={true}
                        time={true}
                    >
                    </MovieCard>
                </div>
            </div>,
        },
        {
            title: '影院',
            content: <div key='' style={{ textAlign: 'center' }}>影院列表</div>,
        },
        {
            title: '待影',
            content: <div className="movie-main" key=''>
            <div className="onMovie">

                <div className='preview'>
                    <div className="preview-header">
                        预告片推荐
                    </div>
                    <div className="preview-cards">
                        <div className="cards">
                            <img src="./img/banner1.png" alt="" />
                            <div className="title">
                                <p>新大头儿子和小头爸爸</p>
                                <p className="subTitle">《新大头儿子和小头爸爸》</p>
                            </div>
                            <div className="myIcon-bofang">
                                <i className='iconfont icon-icon_play'></i>
                            </div>
                        </div>
                        <div className="cards">
                            <img src="./img/banner2.png" alt="" />
                            <div className="title">
                                <p>无人生还：逃跑计划</p>
                                <p className="subTitle">《无人生还》</p>
                            </div>
                            <div className="myIcon-bofang">
                                <i className='iconfont icon-icon_play'></i>
                            </div>
                        </div>
                        <div className="cards">
                            <img src="./img/banner3.png" alt="" />
                            <div className="title">
                                <p>革命者</p>
                                <p className="subTitle">电影《革命者》</p>
                            </div>
                            <div className="myIcon-bofang">
                                <i className='iconfont icon-icon_play'></i>
                            </div>
                        </div>
                        <div className="cards">
                            <img src="./img/banner4.png" alt="" />
                            <div className="title">
                                <p>两只狗的生活意见</p>
                                <p className="subTitle">戏剧《两只狗的生活意见》</p>
                            </div>
                            <div className="myIcon-bofang">
                                <i className='iconfont icon-icon_play'></i>
                            </div>
                        </div>
                    </div>
                </div>

                <RecCards cardsData={onMovieData} title={'待映推荐'} numCount={true} time={true} haveBtn={true} btnText={'想看'} btnColor={'rgb(254,183,79)'} extra={false}></RecCards>

                <div style={{marginTop:10}}>
                    <MovieCard
                        key=''
                        cardsData={onMovieData}
                        btnCol={'rgb(254,183,79)'}
                        btnTxt={'想看'}
                        wish={true}
                        type={true}
                    >
                    </MovieCard>

                </div>
            </div>
        </div>,
        },
    ];


    // 获取影片
    const getData = useCallback(async (title) => {
        if (title === '热映') {
            const { data } = await request.get('/movie', { page: 1, size: 10, isHot: true });
            sethotMovieData(data.data);
        }
        if (title === '待影') {
            const { data: data2 } = await request.get('/movie', { page: 1, size: 10, isOn: true });
            setonMovieData(data2.data);
        }

    }, []);

    const changeTabs = useCallback(function (tab, index) {
        tabs.forEach(item => {
            if (item.title === tab.title) {
                getData(tab.title);
                setmovieContentBox(tab.title);
            }
        });
    });


    return (
        <div className='movie-box'>
            <div className="movie-header">
                <div className="city">广州<i className="arrow"></i></div>

                <Tabs
                    tabs={tabs}
                    initialPage={0}
                    swipeable={false}
                    tabBarUnderlineStyle={{ width: '20px', marginLeft: '30px', borderColor: '#fff', bottom: 2 }}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
                    onChange={changeTabs}
                >
                </Tabs>

                <i className='iconfont icon-sousuo movie-search'></i>

            </div>


            {
                tabs.map(item => {
                    if (item.title === movieContentBox) {
                        return item.content
                    }
                })
            }

            

        </div>
    )
}

export default Movie;