import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// 引入ajax
import './api/index'

import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
Vue.component('Header', Header)
Vue.component('Star', Star)

// 引入vuex
import store from './store/index'


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
