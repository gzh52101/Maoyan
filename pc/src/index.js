import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

import {HashRouter,BrowserRouter} from 'react-router-dom'

const Router = process.env.NODE_ENV ==='development' ? HashRouter : BrowserRouter
ReactDOM.render(
    <Router>
   <App/>

     </Router>
    ,
    document.querySelector('#app')
)