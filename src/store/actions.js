/**
 * 包含n个间接操作状态属性数据的方法
 */
import {
  reqAddress,
  reqShopList,
  reqCategory,
  reqAutoLogin
} from '../api/index'

import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORY,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN
} from './mutaion_types'


export default {
   // 通过ajax获取商铺地址信息
   async getAddress({commit, state}) {
     const res = await reqAddress(state.latitude, state.longitude)
     if(res.code === 0){
       commit(RECEIVE_ADDRESS, {address: res.data})
     }
   },

   // 获取店铺信息
   async getShops({commit, state}) {
    const latitude = state.latitude
    const longitude = state.longitude
    const res = await reqShopList({latitude, longitude})
     if(res.code === 0){
       commit(RECEIVE_SHOPS, {shops: res.data})
     }
   },

   // 获取食品分类列表
   async getCategories({commit}) {
     const res = await reqCategory()
     if(res.code === 0){
       commit(RECEIVE_CATEGORY, {categorys: res.data})
     }
   },

   // 保存user信息
   getUser({commit}, user) {
     // 保存token
     const token = user.token
     localStorage.setItem('token_key', token)
     commit(RECEIVE_TOKEN, token)
     // 保存user信息
     delete user.token
    commit(RECEIVE_USER, {user})
   },

   // 退出登陆
   loginOut({commit}) {
     // 清空user
     commit(RESET_USER)
     // 清空token
     localStorage.setItem('token_key', '')
     commit(RESET_TOKEN)
   },

   // 自动登陆
   async autoLogin({commit, state}) {
     const token = state.token
     if(token){
      const result = await reqAutoLogin()
      if(result.code === 0){
        const user = result.data
        commit(RECEIVE_USER, {user})
      }
     }
    
   }
}