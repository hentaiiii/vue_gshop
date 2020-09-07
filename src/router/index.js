/**
 * 路由模块
 */
import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'

// import Msite from 'pages/Msite/Msite.vue'
// import Order from 'pages/Order/Order.vue'
// import Profile from 'pages/Profile/Profile.vue'
// import Search from 'pages/Search/Search.vue'
/*
  import动态引入 就是引入函数 ----- 就是路由懒加载 -- 引用时机： 大一点的组件才需要因为需要发请求
  import(module) 会被动态引入打包成js --- wepack行为
  路由配置是一个函数的时候：返回包含路由组件的promise对象
*/
const Msite = () => import('pages/Msite/Msite.vue')
const Order = () => import('pages/Order/Order.vue')
const Profile = () => import('pages/Profile/Profile.vue')
const Search = () => import('pages/Search/Search.vue')


import Login from 'pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'

import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

import a from '../components/test/a.vue'
import b from '../components/test/b.vue'
import b11 from '../components/test/b11.vue'
import b22 from '../components/test/b22.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/msite', component: Msite, meta: {showFooter: true}},
    {path: '/order', component: Order, meta: {showFooter: true}},
    {path: '/profile', component: Profile, meta: {showFooter: true}},
    {path: '/search', component: Search, meta: {showFooter: true}},
    {path: '/a', component: a},
    {path: '/b', component: b, children: [
      {path: '/b11', component: b11},
      {path: '/b22', component: b22},
    ]},
    {path: '/login', component: Login},
    {path: '/shop', component: Shop, children: [
      {path: '/shop/good', component: ShopGoods},
      {path: '/shop/rating', component: ShopRatings},
      {path: '/shop/info', component: ShopInfo},
      {redirect: '/shop/good', path: '/shop'}
    ]},
    {redirect: '/msite', path: '/'}
  ]
})

// 1. 进入a/b必须登陆, 如果没有登陆自动跳转到登陆
const paths = ['/a', '/b'] // 需要登陆才能访问的路由
router.beforeEach((to, from, next) => {
  // 得到请求路径
  const path = to.path
  if(paths.indexOf(path) !== -1){
    // 是要进入目标路由
    const userId = store.state.users.user._id
    if(!userId){
      // 不存在
      next('/login')
    }else{
      // 放行
      next()
    }
  }else{
    next()
  }
})

export default router