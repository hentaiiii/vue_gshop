/**
 * 关于shop相关功能的vuex管理
 */
import {
  reqAddress,
  reqShopList,
  reqCategory,
} from '../../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORY,
} from '../mutaion_types'
const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
}
const mutations = {
  [RECEIVE_ADDRESS](state, {
    address
  }) {
    state.address = address
  },
  [RECEIVE_SHOPS](state, {
    shops
  }) {
    state.shops = shops
  },
  [RECEIVE_CATEGORY](state, {
    categorys
  }) {
    state.categorys = categorys
  },
}
const actions = {
  // 通过ajax获取商铺地址信息
  async getAddress({
    commit,
    state
  }) {
    const res = await reqAddress(state.latitude, state.longitude)
    if (res.code === 0) {
      commit(RECEIVE_ADDRESS, {
        address: res.data
      })
    }
  },
  // 获取店铺信息
  async getShops({
    commit,
    state
  }) {
    const latitude = state.latitude
    const longitude = state.longitude
    const res = await reqShopList({
      latitude,
      longitude
    })
    if (res.code === 0) {
      commit(RECEIVE_SHOPS, {
        shops: res.data
      })
    }
  },
  // 获取食品分类列表
  async getCategories({
    commit
  }) {
    const res = await reqCategory()
    if (res.code === 0) {
      commit(RECEIVE_CATEGORY, {
        categorys: res.data
      })
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}