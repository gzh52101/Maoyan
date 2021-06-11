import React from 'react';
import ReactDOM from 'react-dom'
import { PullToRefresh, ListView, Tabs, WhiteSpace, Button, TabBar, Carousel, WingBlank, Drawer, List, NavBar, Icon, InputItem, Toast } from 'antd-mobile';

class Demo extends React.Component {
  state = {
    tel: '',
    password: '',
    loginBtn: false,
  }

  onChangeTel = (value) => {
    this.setState({
      tel: value,
    });
    
    console.log('tel',value.length);
    console.log('password',this.state.password.length);
    if(value > 12 && this.state.password.length > 7){
      this.setState({
        loginBtn: true
      });
    }else{
      this.setState({
        loginBtn: false
      });
    }
    
  }

  onChangePwd = (value) =>{
    this.setState({
      password: value
    });
   
    console.log('pwd,tel',this.state.tel.length);
    console.log('pwd,password',value.length);
    if(this.state.tel.length > 12 && value > 7){
      this.setState({
        loginBtn: true
      });
    }else{
      this.setState({
        loginBtn: false
      });
    }

  }

  closetel = ()=>{
    this.setState({
      tel: ''
    })
  }
  
  render() {
    return (
      <div>
        <List>
          <InputItem
            type="phone"
            placeholder="请输入手机号"
            onChange={this.onChangeTel}
            value={this.state.tel}
            style={{position:'relative'}}
          >
            <span style={{color: '#666'}}>+86&nbsp;&gt;</span>
            {this.state.tel.length>0?<Icon type='cross' style={{position:'absolute',top:'25%',right:20,zIndex:99}} onClick={this.closetel.bind(this)}/>:null}
            
          </InputItem>
        </List>

        <List>
          <InputItem
            type="password"
            placeholder="请输入密码"
            onChange={this.onChangePwd}
            value={this.state.password}
          ></InputItem>
        </List>
        {
          this.state.loginBtn? <Button type="warning">登录</Button> :
          <Button type="warning" disabled>登录</Button>
        }
        
        
      </div>
    );
  }
}



export default Demo;
