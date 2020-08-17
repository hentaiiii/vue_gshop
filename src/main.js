import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// 引入ajax
import './api/index'

// 引入mbutton
import {Button} from 'mint-ui'

// 引入mock数据
import './mock/mock-server'
// 引入cartControl
import CartControl from './components/cartControl/cartControl.vue'

import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component(Button.name, Button)

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
