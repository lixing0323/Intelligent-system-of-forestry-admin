const state = {
  chinaZones: undefined,
  categories: undefined,
  units: undefined
}

const mutations = {
  SET_CHINA_ZONES: (state, chinaZones) => {
    state.chinaZones = chinaZones
  },
  SET_CATEGORIES: (state, categories) => {
    state.categories = categories
  },
  SET_UNITS: (state, units) => {
    state.units = units
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
