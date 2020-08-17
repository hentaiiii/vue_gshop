/**
 * 管理msite相关功能的vuex模块
 */
import {
  reqGoods,
  reqInfo,
  reqRatings,
} from '../../api'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
} from '../mutaion_types'

const state = {
  goods: [],
  ratings: [],
  info: {},
}
const mutations = {
  [RECEIVE_GOODS](state, goods) {
    state.goods = goods
   },
   [RECEIVE_RATINGS](state, ratings) {
    state.ratings = ratings
   },
   [RECEIVE_INFO](state, info) {
    state.info = info
   },
}
const actions = {
   // 获取商品列表数组
   async getGoods({commit}) {
    const result = await reqGoods()
    if(result.code === 0){
      const goods = result.data
      commit(RECEIVE_GOODS, goods)
    }
  },
  // 获取商家店铺评论数组
  async getRatings({commit}) {
   const result = await reqRatings()
   if(result.code === 0){
     const ratings = result.data
     commit(RECEIVE_RATINGS, ratings)
   }
 },
  // 获取商家
  async getInfo({commit}) {
   const result = await reqInfo()
   if(result.code === 0){
     const info = result.data
     commit(RECEIVE_INFO, info)
   }
 },
}
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters,
}