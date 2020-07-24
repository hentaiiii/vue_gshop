/**
 * 包含n个间接操作状态属性数据的方法
 */
import {
  reqAddress,
  reqShopList,
  reqCategory
} from '../api/index'

import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORY
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
   }
}