/**
 * 包含多个接口请求函数的模块
 */
import ajax from './ajax'
const BASE = '/api'

/**
 * 根据经纬度获取位置详情
 */
export const reqAddress = (latitude, longitude) => ajax({
  method: 'GET',
  url: BASE + `/position/${latitude},${longitude}`

})
/**
 * 获取食品分类列表
 */
export const reqCategory = () => ajax.get(BASE + '/index_category', {
  headers: {
    needToken: true
  }
})

/**
 * 根据经纬度获取商铺列表
 */
export const reqShopList = ({latitude, longitude}) => ajax({
  url: BASE + "/shops",
  params: { latitude, longitude},
  headers: {
    needToken: true
  }
})
/**
 * 获取短信验证码
 */
export const reqSendCode = (phone) => ajax.get(BASE + '/sendcode', {
  params: {
    phone
  }
})
/**
 * 短信登陆
 */
export const reqSmsLogin = ({phone,code}) => ajax.post(BASE + '/login_sms', {
  phone,
  code
})

/**
 * 密码登陆
 */
export const reqPwdLogin = ({name, pwd, captcha
}) => ajax.post(BASE +'/login_pwd', {
  name,
  pwd,
  captcha
})

/**
 * 根据token自动登陆
 */
export const reqAutoLogin = () => ajax.get(BASE + '/auto_login', {
  headers: {
    needToken: true
  }
})
/**
 * 获取商家商品列表
 */
export const reqGoods = () => ajax.get('/goods', {
  headers: {
    needToken: true
  }
})

/**
 * 获取商家信息
 */
export const reqInfo = () => ajax.get('/info', {
  headers: {
    needToken: true
  }
})

 /**
  * 获取评论信息
  */
 export const reqRatings = () => ajax.get('/ratings', {
  headers: {
    needToken: true
  }
})

reqGoods().then((result) => {
  console.log(result)
})
