import React, { useState, useCallback } from 'react';

function Login() {
    const [loginBoxAnimate, setloginBoxAnimate] = useState('');

    const gologin = useCallback((switchBtn) => {
        if (switchBtn) {
            setloginBoxAnimate('openLoginBox')
        } else {
            setloginBoxAnimate('closeLoginBox')
        }
    }, []);

    return (

        <div className={`${loginBoxAnimate} loginBox`}>
            <button onClick={gologin.bind(this, false)} style={{ width: 100, height: 50 }}>close</button>
        </div>

    )
}

export default Login;