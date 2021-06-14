import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import Index from './views/Index.jsx';
import Login from './views/Login.jsx';
import Detail from './views/Detail';
import './scss/common.scss'
import 'antd-mobile/dist/antd-mobile.css';
import './scss/animation.scss';

function App(){

    return(
        <div className="container">
            <Switch>
                <Route path="/index" component={Index}></Route>
                <Route path="/detail/:id" component={Detail}></Route>
                <Redirect from="/" to="/index" exact/>
                <Redirect to="notfound"/>
            </Switch>
            <Login/>
        </div>
    )
}

export default App;