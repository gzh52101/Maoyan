import {OpenLoginBox,Login,Logout} from '../actions/login';

let userInfo  = localStorage.getItem('userInfo');
try{
    userInfo = JSON.parse(userInfo)
}catch(err){
    userInfo = null;
}

const initState = {
    loginBoxAnimate: '',
    userInfo,
}

function userReducer(state=initState,action){
    switch(action.type){
        case OpenLoginBox:
            let switchBtn = action.switchBtn;
            const newState = {
                ...state,
                loginBoxAnimate: switchBtn ? 'openLoginBox' : 'closeLoginBox',
            }
            return newState;
        case Login:
            localStorage.setItem('userInfo',JSON.stringify(action.user));
            return {
                ...state,
                userInfo: action.user,
            };
        case Logout:
            localStorage.removeItem('userInfo')
            return {
                ...state,
                userInfo:null
            }
        default:
            return state;
    }
}

export default userReducer;