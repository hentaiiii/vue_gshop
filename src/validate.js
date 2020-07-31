import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)

// 提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    username: '用户名',
    phone: '手机号',
    code: '验证码',
    password: '密码aaa',
    captcha: '图形验证码',
  }
})

// 自定义规则验证
VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})

VeeValidate.Validator.extend('username', {
  validate: value => {
    return /^\w{5,8}$/.test(value)
    // return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是5-8位数字字母或下划线'
})
VeeValidate.Validator.extend('password', {
  validate: value => {
    return /^\w{3,10}$/.test(value)
    // return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是3-8位数字字母或下划线'
})
VeeValidate.Validator.extend('captcha', {
  validate: value => {
    return /^\w{4}$/.test(value)
  },
  getMessage: field => field + '必须是4位数字字母或下划线'
})