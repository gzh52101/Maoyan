import React, { useState, useCallback, useEffect } from 'react';
import request from '../utils/request';
import '../scss/detail.scss';

function Detail(props) {

  const { match,history } = props;

  const { id: movieId } = match.params;

  const [detailMovieData, setdetailMovieData] = useState([]);

  // 初始化调用
  useEffect(function () {
    getData();
  }, []);

  useEffect(() => {
    return () => {
      setdetailMovieData(null)
    }
  }, [])

  const gobackRoute = useCallback(()=>{
    history.goBack();
  });


  // 获取影片
  const getData = useCallback(async () => {
    const { data } = await request.get('/movieSelect', { select: `${movieId}` });
    setdetailMovieData(data.data[0]);
  }, []);

  return (
    <div className='detail-box' style={{ backgroundColor: detailMovieData.backgroundColor}}>
      <div className='detail-header'>
        <span style={{fontSize:24}} onClick={gobackRoute}>&lt;</span>
        <span style={{fontSize:16,color:'#ddd'}}>电影</span>
        <i className='iconfont icon-fenxiang'></i>
      </div>

      <div className="detail-content">

        <div className="detail-top">
          <div className="detail-top-left">
            <img src={detailMovieData.img} alt="" />
          </div>
          <div className="detail-top-right">
            <p className="title">{detailMovieData.nm}</p>
            <p className='subTitle'>{detailMovieData.enm}</p>
            <p>{`${detailMovieData.cat}`.replace(',','/')}</p>
            <p>{detailMovieData.pubDesc}</p>
            <div className='btns'>
              <div className="wish">想看</div>
              <div className="wished">看过</div>
            </div>
          </div>
        </div>

        <div className="detail-wish">
          <i style={{fontSize:18}}>{detailMovieData.scoreLabel}</i>
          <div className='wish-item'>
            <p><span>{detailMovieData.wish}</span>人想看</p>
            <p><span>{detailMovieData.watched}</span>人看过</p>
          </div>
          
        </div>

        <div className="detail-dra">
          <div className="detail-dra-title">
            <span>简介</span>
            <span style={{fontSize:14}}>展开</span>
          </div>
          <p>{detailMovieData.dra}</p>
        </div>

      </div>

      <div className="detail-btn">
        <div className="btn">特惠购票</div>
      </div>
    </div>
  )
}

export default Detail;