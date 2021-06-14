export const LOGIN = 'USER_LOGIN'
export const LOGOUT = 'USER_LOGOUT'


export function login(user){
    return{
        type:LOGIN,
        user,
    }
}


export function logout(){
    return{
        type:LOGOUT,
    }
}

export default {
    login,
    logout,
}