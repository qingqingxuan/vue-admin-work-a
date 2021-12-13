import { Module } from 'vuex'
import type { AppState, RootState } from '../types'

export const appModule: Module<AppState, RootState> = {
  namespaced: true,
  state: {
    version: '1.0.1',
    appName: 'Vue Admin Work A',
  },
  getters: {
    getVersion(state): string {
      return state.version
    },
    getAppName(state): string {
      return state.appName
    },
  },
  actions: {
    changeVersion({ commit }, newVersion) {
      commit('CHANGE_VERSION', newVersion)
    },
  },
  mutations: {
    CHANGE_VERSION(state, newVersion) {
      state.version = newVersion
    },
  },
}
