import React,{useState,useCallback} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import Index from './views/Index.jsx';
import Login from './views/Login.jsx';
import Demo from './views/test';
import './scss/common.scss'
import 'antd-mobile/dist/antd-mobile.css';
import './scss/animation.scss';

function App(){

    return(
        <div className="container">
            <Switch>
                <Route path="/index" component={Index}></Route>
                <Route path="/demo" component={Demo}></Route>
                <Redirect from="/" to="/index" exact/>
                <Redirect to="notfound" />
            </Switch>
            <Login/>
        </div>
    )
}

export default App;