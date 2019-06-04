import { baseUrl } from './env'
import axios from 'axios'
import { Message } from 'element-ui'

//配置项通过一定的规则合并，request config > instance.defaults > 系统默认，优先级高的覆盖优先级低的。
// const instance = axios.create({
//     baseURL: baseUrl,
//     timeout: 30000

// });

axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
    // Do something before request is sent
    config.data = JSON.stringify(config.data)
    config.headers =  {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    return config;
}, error => {
    // Do something with request error
    console.log('err22' + error)
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(response=> {
    // Do something with response data
    return response;
}, error => {
    console.log('err333' + error) // for debug
    Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
    })
    return Promise.reject(error)
})


export default axios