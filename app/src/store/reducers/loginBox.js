import {OpenLoginBox} from '../actions/loginBox';

const initState = {
    loginBoxAnimate: ''
}

function userReducer(state=initState,action){
    switch(action.type){
        case OpenLoginBox:
            let switchBtn = action.switchBtn;
            const newState = {
                ...state,
                loginBoxAnimate: switchBtn ? 'openLoginBox' : 'closeLoginBox',
            }
            return newState
        default:
            return state;
    }
}

export default userReducer;