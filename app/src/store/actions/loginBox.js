export const OpenLoginBox = 'loginBox_open';

export function openBox(switchBtn){
    return{
        type: OpenLoginBox,
        switchBtn
    }
}


export default{
    openBox,
}