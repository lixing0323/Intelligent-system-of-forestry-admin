import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  fullscreenStatus: false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_FULL_SCREEN: (state, fullscreenStatus) => {
    state.fullscreenStatus = fullscreenStatus
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeFullScreen({ commit }, data) {
    commit('SET_FULL_SCREEN', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

