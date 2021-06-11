import React, { useCallback } from 'react';

import { connect,useSelector,useDispatch } from 'react-redux';
import {openBox} from '../store/actions/loginBox';

function Mine() {

    const dispatch = useDispatch();
    const {loginBoxAnimate} = useSelector(state => state.loginBox);

    const openLoginBox = useCallback(() => {
        dispatch(openBox(true));
    })

    return (
        <div className="mine-box" >
            <button onClick={openLoginBox} style={{ width: 100, height: 50 }}>登录</button>
        </div>
    )
}

export default Mine;