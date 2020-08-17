/**
 * 管理msite相关功能的vuex模块
 */
import Vue from 'vue'
import {
  reqGoods,
  reqInfo,
  reqRatings,
} from '../../api'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  CLEAR_CART
} from '../mutaion_types'

const state = {
  goods: [],
  ratings: [],
  info: {},
  cartFoods: []
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
   [INCREMENT_COUNT](state, {food}) {
     if(!food.count){ // 如果第一次添加没有count
       // 问题: 新添加的属性没有数据劫持==>数据绑定==>更新了数据但界面不变
       Vue.set(food, 'count', 1)
       // 将数据添加到cartFoods中去
       state.cartFoods.push(food)
     }else{
       food.count++
     }
   },
   [DECREMENT_COUNT](state, {food}) {
    if(food.count){
      food.count--
      if(food.count === 0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
   },
   [CLEAR_CART](state) {
    state.cartFoods.forEach(food => {
      food.count = 0
    })
    state.cartFoods = []
   }
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
  // 更新food的数量
  updateFoodCount({commit}, {isReduce, food}){
    if(isReduce){ // 减少
     commit(DECREMENT_COUNT, {food})
    }else{ // 增加
     commit(INCREMENT_COUNT, {food})
    }
  },
  // 清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  }
}
const getters = {
  // 容易想到 但是性能太低
  // cartFoods(state) {
  //   const {goods} = state
  //   const arr = []
  //   goods.forEach(good => {
  //     good.foods.forEach(food => {
  //       if(food.count > 0){
  //         arr.push(food)
  //       }
  //     })
  //   })
  //   return arr
  // }
  // 点单的总数量
  totalCount(state){
    return state.cartFoods.reduce((pre, food) => pre + food.count,0)
  },
  // 点单总价格
  totalPrice(state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
}