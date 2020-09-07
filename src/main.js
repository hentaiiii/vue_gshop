import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// 引入ajax
import './api/index'

// 引入mbutton
import {Button} from 'mint-ui'

// 引入mock数据
import './mock/mock-server'
// 引入全局过滤器
import './filtes'
// 引入cartControl
import CartControl from './components/cartControl/cartControl.vue'
import Split from './components/Split/Split.vue'

import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'

// 引入图片懒加载
import VueLazyLoad from 'vue-lazyload'
import loading from '../public/loading.gif'

// 定义全局事件总线 --- 利用vue的自定义事件
Vue.prototype.eventBus = new Vue()

Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
// 注册为全局组件标签
Vue.component('Split', Split)
Vue.component(Button.name, Button)

Vue.use(VueLazyLoad,{
 loading
})

// 引入vuex
import store from './store/index'

/*eslint no-debugger: "error"*/


// new Vue({
//   el: '#app',
//   components: {
//     App
//   },
//   template: '<App/>'
// })

new Vue({
 render: h => h(App),
 router, // 配置路由器
 store  // 配置vuex
}).$mount('#app')
