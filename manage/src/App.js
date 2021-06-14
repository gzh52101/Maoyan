import React from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import Login from "./views/login"
import home from "./views"
import '@/css/App.scss'
import 'antd/dist/antd.css';
function App(){
        return(
            <div className="box">
                <Switch>
                <Route path="/login" component={Login} />
                <Route path="/index" component={home} />
                <Redirect  from="/" to="/login" exact/>
                </Switch>
            </div>
        )
}


export default App