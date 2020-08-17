/**
 * 管理user相关功能模块的vuex
 */
import {
  reqAutoLogin,
} from '../../api'
import {
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
} from '../mutaion_types'
const state = {
  user: {}, // 用户信息对象
  token: localStorage.getItem('token_key') || '',

}
const mutations = {
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
  },
}
const actions = {
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
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}