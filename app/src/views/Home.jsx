import React, { useCallback } from 'react';
import '../scss/home.scss';
import { Tabs, Carousel, WingBlank } from 'antd-mobile';
import RecommendBox from './home/Recommend ';

let tabs = [
    { title: '放映厅' },
    { title: '推荐' },
    { title: '热映' },
    { title: '预告' },
    { title: '说电影' },
    { title: '佳片' },
    { title: '热播剧' },
    { title: '爱动漫' },
    { title: '精彩片段' },
    { title: '盘点' },
    { title: '欢喜首映' },
    { title: '猫眼看戏' },
    { title: '娱乐圈' },
    { title: '悬疑' },
    { title: '科幻' },
    { title: '爱情' },
    { title: '奇幻' },
    { title: '资讯' },
];
function Home(props) {

    const changeTabs = useCallback(function (tab, index) {
    
    });

    // tabs切换内容
    const renderContent = tab =>
    (
        <div className="main" >
            {
                tab.title === "推荐" ? <RecommendBox {...props}/> : null
            }
            
        </div>
    );

    return (
        <div className="home-box">
            <div className="header">
                <div className="search-box">
                    <div className="city">广州<i className="arrow"></i></div>
                    <div className="search-input">
                        <i className="iconfont icon-sousuo"></i>
                        <WingBlank>
                            <Carousel className="my-carousel"
                                vertical
                                dots={false}
                                dragging={false}
                                swiping={false}
                                autoplay
                                infinite
                                autoplayInterval={5000}
                            >
                                {['战狼2', '你好世界', '阳光姐妹淘'].map(type => (
                                    <div className="v-item" key={type}>{type}</div>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>
                </div>

            </div>
            <div className="nav-tabs">
                <Tabs
                    tabs={tabs}
                    initialPage={1}
                    swipeable={false}
                    tabBarUnderlineStyle={{ width: '15px', marginLeft: '30px', borderColor: 'red' }}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
                    onChange={changeTabs}
                >
                    {renderContent}
                </Tabs>
            </div>
        </div>
    )
}

export default Home;