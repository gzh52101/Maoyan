export const OpenLoginBox = 'loginBox_open';
export const Login = 'user_login'
export const Logout = 'user_logout'

export function openBox(switchBtn){
    return{
        type: OpenLoginBox,
        switchBtn
    }
}

export function login(user){
    return{
        type: Login,
        user
    }
}

export function logout(){
    return{
        type: Logout,
    }
}


export default{
    openBox,
    login,
    logout,
}