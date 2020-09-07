// 过滤器
import Vue from 'vue'
import moment from 'moment'

// 日期格式化
Vue.filter('date-format', (value, format) => {
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})