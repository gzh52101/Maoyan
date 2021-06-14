import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../scss/movie.scss';
import { Tabs } from 'antd-mobile';
import HotMovie from './movie/HotMovie';
import OnMovie from './movie/OnMovie';


function Movie(props) {
    
    const { history, match } = props;
    
    let tabs = [
        {
            title: '热映',
            path: `${match.path}/hot`,
        },
        {
            title: '影院',
            path: `${match.path}/cinema`,
        },
        {
            title: '待映',
            path: `${match.path}/on`,
        },
    ];

    
    const [currentTab, setCurrentTab] = useState();

    useEffect(() => {
        history.listen((location) => {
            tabs.forEach((item, index) => {
                if (location.pathname === item.path) {
                    setCurrentTab(index);
                }
            });
        });
    }, [])

    useEffect(() => {
        return () => {
            setCurrentTab(null)
        }
    },[])

    const changeTabs = useCallback(function (tab, index) {
        history.push(tab.path);
        setCurrentTab(index);
    });

    return (
        <div className='movie-box'>
            <div className="movie-header">
                <div className="city">广州<i className="arrow"></i></div>

                <Tabs
                    tabs={tabs}
                    page={currentTab}
                    swipeable={false}
                    tabBarUnderlineStyle={{ width: '20px', marginLeft: '30px', borderColor: '#fff', bottom: 2 }}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
                    onChange={changeTabs}
                >
                </Tabs>

                <i className='iconfont icon-sousuo movie-search'></i>

            </div>

            <Switch>
                <Route path={match.path + '/hot'} component={HotMovie}></Route>
                <Route path={match.path + '/on'} component={OnMovie}></Route>
                <Route path={match.path + '/cinema'} component={() => (<div>影院</div>)}></Route>
                <Redirect from={match.path + '/'} to={match.path + "/hot"} exact />
             
            </Switch>

        </div>
    )
}

export default Movie;