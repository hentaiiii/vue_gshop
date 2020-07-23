/**
 * 包含n个直接操作状态属性数据的对象
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS
} from './mutaion_types'


export default {
   [RECEIVE_ADDRESS](state, {address}) {
     state.address = address
   },
   [RECEIVE_SHOPS](state, {shops}) {
     state.shops = shops
   }
}