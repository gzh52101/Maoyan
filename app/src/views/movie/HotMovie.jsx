import React, { useState, useCallback, useEffect } from 'react';
import Banner from '../../components/Banner';
import request from '../../utils/request';
import MovieCard from '../../components/MovieCard';
import '../../scss/movie.scss';


// 轮播图数据
const bannerData = {
    data: ['banner1.png', 'banner2.png', 'banner3.png', 'banner4.png', 'banner5.png', 'banner6.png', 'banner7.png'],
}

function Movie(props) {
    const [hotMovieData, sethotMovieData] = useState([]);

    // 初始化调用
    useEffect(function () {
        getData();
    }, []);

    useEffect(() => {
        return () => {
            sethotMovieData(null)
        }
    },[])

    // 获取影片
    const getData = useCallback(async () => {
        const { data } = await request.get('/movie', { page: 1, size: 50, isHot: true });
        sethotMovieData(data.data);
    }, []);

    return (
        <div className="movie-main" key=''>
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
                    props={props}
                >
                </MovieCard>
            </div>
        </div>
    )
}

export default Movie;