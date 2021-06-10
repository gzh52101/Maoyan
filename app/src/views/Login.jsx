import React, { useState, useCallback, useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { openBox } from '../store/actions/loginBox';
import '../scss/login.scss';
import { Icon, List, InputItem, Button } from 'antd-mobile';
import request from '../utils/request';


function Login() {

    const dispatch = useDispatch();
    const { loginBoxAnimate } = useSelector(state => state.loginBox);

    const closeBtn = useCallback(() => {
        dispatch(openBox(false));
    });

    const [loginBtn, setLoginBtn] = useState();
    const [tel, setTel] = useState('');
    const [password, setPassWord] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [PwdType, setPwdType] = useState('password');
    const [cutLoginBox, setCutLoginBox] = useState(true);
    const [vcode, setVCode] = useState('');
    const [vcodeBox, setVCodeBox] = useState('');

    useEffect(() => {
        if (tel.length > 12 && password.length > 7 && vcode.length > 3) {
            setLoginBtn(true);
        } else {
            setLoginBtn(false);
        }
    });

    useEffect(async () => {
        getVCode();
    }, []);

    

    const getVCode = useCallback(async () => {
        const imgCode = await request('/vcode');
        setVCodeBox(imgCode.data);
    });

    const onChangeTel = useCallback((value) => {
        setTel(value);
    }, []);

    const onChangePwd = useCallback((value) => {
        setPassWord(value);
    }, []);

    const onChangeVCode = useCallback((value) => {
        setVCode(value);
    }, []);

    const onFinish = useCallback(() => {
        console.log(tel);
        console.log(password);
        console.log(vcode);
    });

    const goCodeLogin = useCallback(() => {
        setCutLoginBox(!cutLoginBox);
        getVCode();
        cleanTel();
        cleanPwd();
        setVCode('');
    });

    const cleanTel = useCallback(() => {
        setTel('');
    }, []);
    const cleanPwd = useCallback(() => {
        setPassWord('');
    }, []);

    const cheackPwd = useCallback(() => {
        setShowPwd(!showPwd);
        if (showPwd) {
            setPwdType('password');
        } else {
            setPwdType('text');
        }
    });

    return (

        <div className={`${loginBoxAnimate} loginBox`}>

            <div className='login-header'>
                <Icon type='cross' onClick={closeBtn} />
                <div style={{ fontSize: 12 }}>帮助</div>
            </div>
            <div className='login-form'>
                <h2>登录</h2>

                {
                    cutLoginBox ?
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <List style={{ padding: '5px 0 0', borderBottom: '1px solid #ddd', position: 'relative' }}>
                                <InputItem
                                    type="phone"
                                    placeholder="请输入手机号"
                                    onChange={onChangeTel}
                                    value={tel}
                                >
                                    <span style={{ color: '#666', fontSize: 12 }}>+86&nbsp;&gt;</span>

                                </InputItem>
                                {
                                    tel.length > 0 ? <Icon type='cross' style={{ position: 'absolute', top: '25%', right: '0px', zIndex: 99, color: '#ccc' }} onClick={cleanTel} /> : null
                                }
                            </List>

                            <List style={{ padding: '5px 0 0', borderBottom: '1px solid #ddd', position: 'relative' }}>
                                <InputItem
                                    type={PwdType}
                                    placeholder="请输入密码"
                                    onChange={onChangePwd}
                                    value={password}
                                ></InputItem>
                                {
                                    password.length > 0 ? <Icon type='cross' style={{ position: 'absolute', top: '25%', right: '30px', zIndex: 99, color: '#ccc' }} onClick={cleanPwd} /> : null
                                }
                                {
                                    showPwd ? <i className='iconfont icon-yanjing' onClick={cheackPwd} style={{ position: 'absolute', top: '25%', right: '0px', zIndex: 99, fontSize: 20, color: '#ccc' }}></i> : <i className='iconfont icon-close-eye' onClick={cheackPwd} style={{ position: 'absolute', top: '25%', right: '0px', zIndex: 99, fontSize: 20, color: '#ccc' }}></i>
                                }

                            </List>
                            <div style={{ margin: '10px 0' }}>
                                <List style={{ padding: '5px 0 0', borderBottom: '1px solid #ddd' }}>
                                    <InputItem
                                        type='text'
                                        placeholder="请输入验证码"
                                        onChange={onChangeVCode}
                                        value={vcode}
                                    ></InputItem>
                                </List>
                                <div dangerouslySetInnerHTML={{ __html:vcodeBox}} onClick={getVCode}></div>
                            </div>

                            <p style={{ fontSize: 12, color: '#999' }}>未注册的手机号验证后自动创建猫眼账户</p>
                            {
                                loginBtn ? <Button type="warning" onClick={onFinish} style={{ margin: '25px 0', height: 40, lineHeight: '40px' }}>登录</Button> : <Button type="warning" disabled onClick={onFinish} style={{ margin: '25px 0', height: 40, lineHeight: '40px' }}>登录</Button>
                            }
                            <p style={{ display: 'flex', justifyContent: 'space-between ' }}>
                                <span onClick={goCodeLogin}>验证码登录</span>
                                <span>忘记密码</span>
                            </p>
                        </div>
                        :
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <List style={{ padding: '5px 0 0', borderBottom: '1px solid #ddd', position: 'relative' }}>
                                <InputItem
                                    type="phone"
                                    placeholder="请输入手机号"
                                >
                                    <span style={{ color: '#666', fontSize: 12 }}>+86&nbsp;&gt;</span>

                                </InputItem>
                                {
                                    tel.length > 0 ? <Icon type='cross' style={{ position: 'absolute', top: '25%', right: '0px', zIndex: 99, color: '#ccc' }} /> : null
                                }
                            </List>
                            <p style={{ fontSize: 12, color: '#999',marginTop:10 }}>未注册的手机号验证后自动创建猫眼账户</p>
                            <Button type="warning" disabled style={{ margin: '25px 0', height: 40, lineHeight: '40px' }}>获取短信验证码</Button>
                            <p style={{ display: 'flex', justifyContent: 'space-between ' }}>
                                <span onClick={goCodeLogin}>密码登录</span>
                            </p>
                        </div>


                }


            </div>
            <div className="login-type">
                <i className="iconfont icon-weixin" style={{ color: 'rgb(86,191,62)' }}></i>
                <i className="iconfont icon-11qq" style={{ color: 'rgb(28,176,229)' }}></i>
            </div>
            <p className='login-footer'>登录代表你已同意<span>《猫眼用户协议》</span>、<span>《隐私政策》</span>,并授权使用您的猫眼账号信息（如昵称、头像、收货地址）以便您统一管理</p>
        </div>

    )
}


export default Login;