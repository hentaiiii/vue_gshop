/**
 * 包含n个直接操作状态属性数据的对象
 */

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
   [RECEIVE_ADDRESS](state, {address}) {
     state.address = address
   },
   [RECEIVE_SHOPS](state, {shops}) {
     state.shops = shops
   },
   [RECEIVE_CATEGORY](state, {categorys}){
    state.categorys = categorys
   },
   [RECEIVE_USER](state, {user}) {
     state.user = user
   },
   [RESET_USER](state) {
     state.user = {}
   },
   [RECEIVE_TOKEN](state, token) {
     state.token = token
   },
   [RESET_TOKEN](state) {
    state.token = ''
   }
}