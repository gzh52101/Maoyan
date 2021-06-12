import React from 'react';
import {Card } from 'antd-mobile';
import '../scss/RecCards.scss';

function RecCards({Len,cardsData,title,time=false,haveBtn=false,btnText,btnColor,numCount=false,extra=true}) {
    
    return(
        <Card style={{paddingTop:8,marginTop:10}}>
            <Card.Header
                title={<h2 style={{fontSize:18,fontWeight:'normal'}}>{title}</h2>}
                extra={extra?<span>全部{numCount? Len+'部':null}&nbsp;&gt;</span>:null}
            />
                <Card.Body style={{padding: '0px'}}>
                    <div className="hot-movie">
                    {
                        cardsData.map(item=>(
                            <div className="cards" key={item.id}>
                                <div className="card-img">
                                    <img src={item.img}/>
                                    <p><span>{item.wish}</span>想看</p>
                                </div>
                                <h3 className="title">{item.nm}</h3>
                                {time?<h4 className="time">{`${item.pubDesc.split('-')[1]}月${(item.pubDesc.split('-')[2]).substring(0,2)}日`}</h4>:null}
                                {haveBtn ? <button style={{backgroundColor: btnColor}}>{btnText}</button>:null}
                                
                            </div>
                        ))
                    }
                    </div>
                </Card.Body>
            </Card>
    )
}

export default RecCards;