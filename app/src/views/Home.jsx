import React, { useState, useCallback } from 'react';
import '../scss/home.scss';
import { Tabs, TabBar } from 'antd-mobile';

function Home() {
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

    const changeTabs = useCallback(function (tab, index) {
        console.log('tab', tab);
        console.log('index', index);
    });

    const renderContent = tab =>
    (
        <div className="main">
            <p>Content of {tab.title}</p>
            <p>Content of {tab.title}</p>
            
        </div>
    );

    return (
        <div className="home-box">
            <div className="header">
                <div className="search-box">
                    <div className="city">广州<i className="arrow"></i></div>
                    <div className="search-input">
                        <i className="iconfont icon-sousuo"></i>
                        <span>战狼2</span>
                    </div>
                </div>

            </div>
            <div className="nav-tabs">
                <Tabs
                    tabs={tabs}
                    initialPage={1}
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