import React from 'react'
import {HashRouter,BrowserRouter} from 'react-router-dom'

import Home from './view/Home'
import index from './view/index'
import Login from './view/Login'
import Reg from './view/Reg'
import 'antd/dist/antd.css'

class App extends React.Component{
    constructor (props){
        super(props)
        this.state={
            menu:[
                {
                    path:'/index',
                    text:'首页'
                },{
                    path:'/Home',
                    text:'主页'
                },{
                    path:'/Login',
                    text:'登录'
                }
            ]
        }
    }
     render(){
        return(
            <Login/>
        //      <div>
        //     test
        // </div>
        )
      
     }
    
}
export default App