import axios from "axios";


let AUTH_TOKEN = "";

// axios.defaults.baseURL = "http://localhost:1906/"; // 基路径 
axios.defaults.headers.common['token'] = AUTH_TOKEN; // token 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import {
    Toast
} from "vant";



import router from "@/router"

// 拦截器配置    Interceptors 
// 发送请求之前 添加拦截器  
axios.interceptors.request.use(function (config) {
    // 发送之前做的事情 

    if (sessionStorage.userInfo) {
        AUTH_TOKEN = JSON.parse(sessionStorage.userInfo).token;
    }
    config.headers['token'] = AUTH_TOKEN;
    console.log(config);
    Toast.loading({
        message: '加载中...',
        duration: 3000
    });

    return config;
}, function (error) {
    // 发送失败 做的失败 
    return Promise.reject(error);
});

// 响应数据 的拦截器 
axios.interceptors.response.use(function (response) {
    // 成功接收到数据 
    console.log(response);
    Toast.clear();
    return response;
}, function (error) {
    // 无法接收到数据  
    return Promise.reject(error);
});




export default axios;