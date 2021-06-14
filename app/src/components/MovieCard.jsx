import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../scss/movieCard.scss';
import { openBox } from '../store/actions/login';

function MovieCard({ cardsData, btnCol, btnTxt, score = false, wish = false, type = false, time = false,props }) {

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.login);

    const checkLogin = useCallback(()=>{
        dispatch(openBox(true));
    });

    const goDetail = useCallback(function (id) {
        props.history.push('/detail/'+id);
    });

    return (

        cardsData.map((item, idx) => (
            <div className="movie-cards" key={item.id}>

                <div className="cards">
                    <div className="cards-img" onClick={goDetail.bind(this, item.id)}>
                        <img src={item.img} alt="" />
                        <div className="myIcon-bofang">
                            <i className='iconfont icon-icon_play'></i>
                        </div>
                    </div>
                    <div className="cards-content" onClick={goDetail.bind(this, item.id)}>
                        <p className='title'>{item.nm}</p>

                        {score ? <p>猫眼评分<span style={{ color: 'orange', marginLeft: 5, fontSize: 16, fontWeight: 'bold' }}>{item.sc}</span></p> : null}

                        {wish ? <p><span style={{ color: 'orange', marginRight: 5, fontSize: 16, fontWeight: 'bold' }}>{item.sc}</span>人想看</p> : null}

                        {type ? <p>{item.cat}</p> : null}

                        <p>主演：{item.star}</p>

                        {time ? <p>{item.pubDesc}</p> : null}


                    </div>
                    <div className="cards-btn">
                        {
                            userInfo ?
                            <div className='btn' style={{ backgroundColor: btnCol }}>{btnTxt}</div>
                            :
                            <div className='btn' onClick={checkLogin} style={{ backgroundColor: btnCol }}>{btnTxt}</div>
                        }
                    </div>
                </div>
            </div>
        ))


    )
}

export default MovieCard;