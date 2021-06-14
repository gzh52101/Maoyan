import React, { useState, useCallback, useEffect } from 'react';
import request from '../../utils/request';
import MovieCard from '../../components/MovieCard';
import RecCards from '../../components/RecCards';
import '../../scss/movie.scss';
import banner1 from '../../../public/img/banner1.png'
function Movie(props) {

    
    const [onMovieData, setonMovieData] = useState([]);

    // 初始化调用
    useEffect(function () {
        getData();

    }, []);

    useEffect(() => {
        return () => {
            setonMovieData(null)
            
        }
    },[])


    // 获取影片
    const getData = useCallback(async () => {
        console.log("===",banner1);
        console.log("===",props);
        const { data } = await request.get('/movie', { page: 1, size: 50, isOn: true }
       
        );

        setonMovieData(data.data);
    }, []);


    return (
        <div className="movie-main" key=''>
            <div className="onMovie">

                <div className='preview'>
                    <div className="preview-header">
                        预告片推荐
                    </div>
                    <div className="preview-cards">
                        <div className="cards">
                            <img src={require("../../../public/img/banner1.png").default} alt="" />
                            <div className="title">
                                <p>新大头儿子和小头爸爸</p>
                                <p className="subTitle">《新大头儿子和小头爸爸》</p>
                            </div>
                            <div className="myIcon-bofang">
                                <i className='iconfont icon-icon_play'></i>
                            </div>
                        </div>
                        <div className="cards">
                            <img src={require("../../../public/img/banner2.png").default} alt="" />
                            <div className="title">
                                <p>无人生还：逃跑计划</p>
                                <p className="subTitle">《无人生还》</p>
                            </div>
                            <div className="myIcon-bofang">
                                <i className='iconfont icon-icon_play'></i>
                            </div>
                        </div>
                        <div className="cards">
                            <img src={require("../../../public/img/banner3.png").default} alt="" />
                            <div className="title">
                                <p>革命者</p>
                                <p className="subTitle">电影《革命者》</p>
                            </div>
                            <div className="myIcon-bofang">
                                <i className='iconfont icon-icon_play'></i>
                            </div>
                        </div>
                        <div className="cards">
                            <img src={require("../../../public/img/banner4.png").default} alt="" />
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

                <div style={{ marginTop: 10 }}>
                    <MovieCard
                        key=''
                        cardsData={onMovieData}
                        btnCol={'rgb(254,183,79)'}
                        btnTxt={'想看'}
                        wish={true}
                        type={true}
                        props={props}
                    >
                    </MovieCard>

                </div>
            </div>
        </div>
    )
}

export default Movie;