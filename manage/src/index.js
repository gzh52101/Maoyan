import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js';
import { HashRouter, BrowserRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
//判断是生产环境还是上线匹配不同的路由模式
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;


ReactDOM.render(

    <Provider store={store}>
        <Router>
            <App />

        </Router>
    </Provider>
    , document.querySelector("#app")
)