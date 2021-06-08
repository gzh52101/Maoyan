import React,{useState,useEffect} from 'react';
import { Carousel, WingBlank, WhiteSpace,Card,Grid } from 'antd-mobile';

function Banner() {

    // 轮播图数据
    const banner = {
        data: ['1', '2', '3', '4', '5', '6', '7'],
    }

    const [bannerImg, setBannerImg] = useState(banner);

    useEffect(function () {
        // 自动轮播
        setTimeout(() => {
            let data = ['1', '2', '3', '4', '5', '6', '7'];
            setBannerImg({data});
        }, 100);
    }, []);

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

    return (
        <>
            <div className="banner">
                
                    
                    <Carousel
                        autoplay={true}
                        infinite
                        autoplayInterval={3000}
                        dotStyle={{ margin: 0, borderRadius: 0, background: 'rgba(230,230,230,0.6)', width: 15, height: 3 }}
                        dotActiveStyle={{ margin: 0, borderRadius: 0, background: '#fff', width: 15, height: 3 }}
                        
                    >
                        {
                            bannerImg.data.map((val, index) => (
                                <a
                                    key={index}
                                    style={{ display: 'inline-block', width: '100%' }}
                                >
                                    <img
                                        src={`./img/banner${val}.png`}
                                        style={{ width: '100%', verticalAlign: 'top', borderRadius: 10 }}
                                        alt={`轮播图${val}`}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            setBannerImg({ data: bannerImg.data});
                                        }}
                                    />
                                </a>
                            ))
                        }

                    </Carousel>
                
            </div>
            
            <Card style={{margin:'10px 0'}}>
                <Card.Body>
                    <div className="adv-header">
                            {
                                advHeader.map(item=>(
                                    <div className="cards" key={item.text}>
                                        <div className="cards-header">
                                            <i 
                                            className={item.icon}
                                            style={{
                                                backgroundImage:`${item.iBackground}`,
                                                color: `${item.iColor}`,
                                            }}
                                            ></i>
                                        </div>
                                        <div style={{textAlign:'center'}}>{item.text}</div>
                                    </div>
                                ))
                            }
                    </div>
                    
                    <div className="adv-bottom">
                        <div className="cards">
                            <h2>砍价专区</h2>
                            <span>0元观影</span>
                        </div>
                        <div className="cards">
                            <h2>砍价专区</h2>
                            <span>0元观影</span>
                        </div>
                        <div className="cards">
                            <h2>砍价专区</h2>
                            <span>0元观影</span>
                        </div>
                        <div className="cards">
                            <h2>砍价专区</h2>
                            <span>0元观影</span>
                        </div>
                        <div className="cards">
                            <h2>砍价专区</h2>
                            <span>0元观影</span>
                        </div>
                        
                    </div>
                </Card.Body>
                
            </Card>

            <div>热映</div>
        </>
    )
}


export default Banner;