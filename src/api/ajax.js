/**
 * 能发送ajax的函数 （axios）
 * 1.处理post请求参数 转化为urlencode模式（原本是json格式）： 请求拦截器
 * 2. 让成功的结果不是response 而是response.data ： 响应拦截器的成功回调
 * 3.统一处理错误结果： 响应拦截器的失败回调
 */
import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = 'http://localhost:4000'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 1.处理post请求参数 转化为urlencode模式（原本是json格式）： 请求拦截器
  const {method, data} = config
  if(method.toUpperCase() === 'POST' && data instanceof Object)
  qs.stringify(data)
  return config
})

//添加相应拦截器
axios.interceptors.response.use(res => {
  // 成功响应
  return res.data
}, err => {
  // 失败响应
  console.log(err)
  return new Promise(() => {})
})


export default axios