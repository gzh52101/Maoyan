import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openBox,login } from '../store/actions/login';
import '../scss/login.scss';
import { Icon, List, InputItem, Button, Toast } from 'antd-mobile';
import request from '../utils/request';


function Login() {

    const dispatch = useDispatch();
    const { loginBoxAnimate } = useSelector(state => state.login);

    const closeBtn = useCallback(() => {
        dispatch(openBox(false));
        cleanTel();
        cleanPwd();
        setVCode('');
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
        if (tel.length > 12 && password.length > 0 && vcode.length > 3) {
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

   
    const checkLogin = useCallback(async (type,{telphone,password,vcode}) => {
        const data = await request.post(`/${type}`, {
            tel: telphone,
            password: password,
            vcode: vcode
        });
        if (data.code === 200) {
            Toast.success('登录成功', 2);
            cleanPwd();
            cleanTel();
            setVCode('');
            closeBtn();
            dispatch(login(data.data));
        } else if (data.code === 400) {
            Toast.offline('账号或密码错误', 2);
            getVCode();
        } else if(data.code === 401){
            Toast.offline('验证码错误或过期', 2);
            setVCode('');
            getVCode();
        }

    }, []);

    const onFinish = useCallback(async () => {

        let numberReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        let telphone = tel.split(' ').join('');
        let passwordReg = /([a-zA-Z0-9]|[._@]){8,32}$/;

        if (numberReg.test(telphone)) {
            if (passwordReg.test(password)) {
                const data = await request.get('/check', { tel: telphone });
                if (data.code === 200) {
                    checkLogin('reg',{telphone,password,vcode});
                } else {
                    checkLogin('login',{telphone,password,vcode});
                }
            } else {
                Toast.offline('密码长度为8-32位字母，数字或@_.特殊字符', 3);
            }
        } else {
            Toast.offline('请输入正确的手机号', 3);
        }
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
                                <div dangerouslySetInnerHTML={{ __html: vcodeBox }} onClick={getVCode}></div>
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
                            <p style={{ fontSize: 12, color: '#999', marginTop: 10 }}>未注册的手机号验证后自动创建猫眼账户</p>
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