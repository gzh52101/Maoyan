import {LOGIN,LOGOUT} from '../actions/user'

let userInfo = localStorage.getItem("userInfo");

try {
    userInfo = JSON.parse(userInfo)
} catch (error) {
    userInfo = null
}

const initState = {
    userInfo
}

function userReducer(state = initState,action){
    switch (action.type) {
        case LOGIN:
        const newState = {
            ...state,
            userInfo:action.user
        }
        localStorage.setItem("userInfo",JSON.stringify(action.user))
        return newState

        case LOGOUT:
            localStorage.removeItem("userInfo");
            console.log(1);
            return{
                ...state,
                userInfo:null,
            }

        default:
            return state
    }
}

export default userReducer