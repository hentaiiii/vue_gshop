import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import './api/index'

import Header from './components/Header/Header.vue'
Vue.component('Header', Header)

// new Vue({
//   el: '#app',
//   components: {
//     App
//   },
//   template: '<App/>'
// })

new Vue({
 render: h => h(App),
 router // 配置路由器
}).$mount('#app')
