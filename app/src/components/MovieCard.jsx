import React from 'react';
import '../scss/movieCard.scss';

function MovieCard({ cardsData,btnCol,btnTxt,score=false,wish=false,type=false,time=false }) {
    
    return (

        cardsData.map((item, idx) => (
            <div className="movie-cards" key={item.id}>

                <div className="cards">
                    <div className="cards-img">
                        <img src={item.img} alt="" />
                        <div className="myIcon-bofang">
                            <i className='iconfont icon-icon_play'></i>
                        </div>
                    </div>
                    <div className="cards-content">
                        <p className='title'>{item.nm}</p>

                        {score ? <p>猫眼评分<span style={{ color: 'orange', marginLeft: 5, fontSize: 16, fontWeight: 'bold' }}>{item.sc}</span></p> : null}

                        {wish ? <p><span style={{ color: 'orange', marginRight: 5, fontSize: 16, fontWeight: 'bold' }}>{item.sc}</span>人想看</p> : null}

                        {type ? <p>{item.cat}</p> : null}

                        <p>主演：{item.star}</p>

                        {time ? <p>{item.pubDesc}</p> : null}
                        
                        
                    </div>
                    <div className="cards-btn">
                        <div className='btn' style={{backgroundColor:btnCol}}>{btnTxt}</div>
                    </div>
                </div>
            </div>
        ))


    )
}

export default MovieCard;