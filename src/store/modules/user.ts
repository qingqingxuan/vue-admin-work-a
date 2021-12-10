import Cookies from 'js-cookie'
import { Module } from 'vuex'
import { UserState, RootState } from '../types'
import layoutStore from '../index'

import Avatar from '@/assets/img_avatar.gif'
import { USER_INFO_KEY, USER_TOKEN_KEY, USER_INFO_KEY } from '@/layouts/setting/keys'

const defaultAvatar = Avatar

const userInfo: UserState = JSON.parse(localStorage.getItem(USER_INFO_KEY) || '{}')
layoutStore.setUserInfo({
  nickName: userInfo.nickName || 'admin',
  avatar: userInfo.avatar || defaultAvatar,
})

export const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    userId: userInfo.userId || 0,
    roleId: userInfo.roleId || 0,
    roles: userInfo.roles || null,
    token: userInfo.token || '',
    userName: userInfo.userName || '',
    nickName: userInfo.nickName || '',
    avatar: userInfo.avatar || defaultAvatar,
  },
  getters: {
    userId(state) {
      return state.userId
    },
    roleId(state) {
      return state.roleId
    },
  },
  actions: {
    saveUser({ commit }, userInfo: UserState) {
      return new Promise<void>((res) => {
        commit('SAVE_USER', userInfo)
        res()
      })
    },
    changeNickName({ commit }, newNickName) {
      commit('CHANGE_NICKNAME', newNickName)
    },
    logout({ commit }) {
      return new Promise<void>((resolve) => {
        commit('LOGOUT')
        resolve()
      })
    },
  },
  mutations: {
    CHANGE_NICKNAME(state, newNickName) {
      state.nickName = newNickName
    },
    SAVE_USER(state, userInfo: UserState) {
      state.userId = userInfo.userId
      state.userId = userInfo.userId
      state.token = userInfo.token
      state.roleId = userInfo.roleId
      state.roles = userInfo.roles
      state.userName = userInfo.userName
      state.nickName = userInfo.nickName
      state.avatar = userInfo.avatar || defaultAvatar
      Cookies.set(USER_TOKEN_KEY, userInfo.token)
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
      layoutStore.setUserInfo({
        nickName: userInfo.nickName,
        avatar: userInfo.avatar || defaultAvatar,
      })
    },
    LOGOUT(state) {
      state.userId = 0
      state.avatar = ''
      state.roleId = 0
      state.roles = []
      state.userName = ''
      state.nickName = ''
      state.token = ''
      Cookies.remove(USER_TOKEN_KEY)
      localStorage.clear()
      layoutStore.reset()
    },
  },
}
