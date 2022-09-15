//在index.js中引入axios
import axios from 'axios';
// //引入qs模块，用来序列化post类型的数据
// import QS from 'qs';
//antd的message提示组件，大家可根据自己的ui组件更改。
import { message } from 'antd';
import { history } from '../utils/history';

//设置axios基础路径
const https = axios.create({
    baseURL: 'http://192.168.1.171:8083',
    timeout: 10000,

})

// 请求拦截器

https.interceptors.request.use(config => {
    // 每次发送请求之前本地存储中是否存在token，通过本地拿到token
    // 如果存在，则统一在https请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    const token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
    //在每次的请求中添加token
    config.data = Object.assign({}, config.data, {
        token: token,
    })
    //设置请求头
    config.headers = {
        'Content-Type': 'application/json',
    }
    if (token && config.url !== '/login') {
        config.headers.token = token; //如果要求携带在请求头中
    }
    // config.data = QS.stringify(config.data)

    return config
}, error => {
    return error;
})

// 响应拦截器
https.interceptors.response.use(response => {
    //根据返回不同的状态码做不同的事情
    console.log(response.data);
    if (response.data) {
        switch (response.data.code) {
            case 200:
                return response.data;
            case 401:
                //token过期处理方法
                history.push("/login")
                message.error("认证过期")
                break;

            default:
                message.error(response.data.msg)//抛出错误
        }
    } else {
        return response.data;
    }
})
//最后把封装好的axios导出
export default https
