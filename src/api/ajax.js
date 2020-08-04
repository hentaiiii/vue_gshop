/**
 * 能发送ajax的函数 （axios）
 * 1.处理post请求参数 转化为urlencode模式（原本是json格式）： 请求拦截器
 * 2. 让成功的结果不是response 而是response.data ： 响应拦截器的成功回调
 * 3.统一处理错误结果： 响应拦截器的失败回调
 * 4.如果有要携带token的请求 needToken = true
 *  1.有就添加请求头 Authorization = token
 *  2.没有就直接进入失败流程
 */
import axios from 'axios'
import qs from 'qs'

import store from '../store'
import {
  Toast
} from 'mint-ui'
import router from '../router'
// axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.timeout = 20000

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 1.处理post请求参数 转化为urlencode模式（原本是json格式）： 请求拦截器
  const {
    method,
    data
  } = config
  if (method.toUpperCase() === 'POST' && data instanceof Object)
    qs.stringify(data)

  if (config.headers.needToken) {
    const token = store.state.token
    if (token) {
      config.headers.Authorization = token
    } else {
      const err = new Error('没有token，请先登陆!')
      err.code = 401
      throw err
    }
  }

  return config
})

//添加相应拦截器
axios.interceptors.response.use(res => {
  // 成功响应
  return res.data
}, error => {
  const {
    response,
    message
  } = error
  const status = response.status
  // 没发送登陆请求 没有token
  if (!response) {
    if (status === 401) {
      if (router.currentRoute.path !== '/login') {
        Toast(message + 'aaaa')
        router.replace('/login')
      }
    }
  } else {
    // 有token但是过期了
    if (status === 401) {
      if (router.currentRoute.path !== '/login') {
        // 提示错误消息
        Toast(response.data.message + 'bbbb')
        // 退出登陆 （清除token）
        store.dispatch('loginOut')
        // 跳转到登陆页面
        router.replace('/login')
      }
    } else if (status === 404) {
      // 请求资源失败
      Toast('请求资源没找到')
    } else {
      Toast('请求错误' + message)
    }
  }

  return new Promise(() => {})
})


export default axios