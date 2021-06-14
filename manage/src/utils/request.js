import axios from "axios";
// export const baseUrl = "http://localhost:5555";
// export const baseUrl = "http://192.168.1.104:5555";
export const baseUrl = "http://159.75.52.223:5555";

export const apiUrl = baseUrl + '/api';
        let userInfo = localStorage.getItem("userInfo")
        try {
            userInfo = JSON.parse(userInfo)
        } catch (error) {
            userInfo =null
        }        
const request = axios.create({
    baseURL:apiUrl,
    withCredentials: true,

});
if(userInfo){
    request.defaults.headers.common['authorization'] =userInfo.authorization
}

export default request;