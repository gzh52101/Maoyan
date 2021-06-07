import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import Index from './views/Index.jsx';
import Login from './views/Login.jsx';
import Demo from './views/test';
import './scss/common.scss'
import 'antd-mobile/dist/antd-mobile.css';

function App(){

    return(
        <div className="container">
            <Switch>
                <Route path="/index" component={Index}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/demo" component={Demo}></Route>
                <Redirect from="/" to="/index" exact/>
                <Redirect to="notfound" />
            </Switch>
        </div>
    )
}

export default App;