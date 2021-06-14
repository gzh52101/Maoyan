import React,{useState,useEffect} from 'react';
import { Carousel } from 'antd-mobile';

function Banner({bannerData}) {

    const [bannerImg, setBannerImg] = useState(bannerData);

    useEffect(function () {
        // 自动轮播
        setTimeout(() => {
            setBannerImg(bannerData);
        }, 100);
    }, []);

    return(
        <div className="banner">
                    
                    <Carousel
                        autoplay={true}
                        infinite
                        autoplayInterval={3000}
                        dotStyle={{ margin: 0, borderRadius: 0, background: 'rgba(230,230,230,0.6)', width: 15, height: 3 }}
                        dotActiveStyle={{ margin: 0, borderRadius: 0, background: '#fff', width: 15, height: 3 }}
                        
                    >
                        {
                            bannerData.map((val, index) => (
                                <a
                                    key={index}
                                    style={{ display: 'inline-block', width: '100%' }}
                                >
                                    <img
                                src={require(`../../public/img/${val}`).default}
                                        style={{ width: '100%', verticalAlign: 'top', borderRadius: 10}}
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
    )
}

export default Banner;