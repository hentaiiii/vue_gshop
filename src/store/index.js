/**
 * vuex最核心的管理模块
 */
import Vue from 'vue'
import Vuex from 'vuex'
import msite from '../store/modules/mSite.js'
import users from '../store/modules/user.js'
import shop from '../store/modules/shop.js'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    msite,
    users,
    shop
  }
  
})