// import { login } from '@/api/userInfo/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { clearAll, getObject, setObject } from '../localStorage'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  permissions: [],
  userInfo: getObject('userInfo')
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_BUSINESSES: (state, businesses) => {
    state.businesses = businesses
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // userInfo login
  login({ commit }, userInfo) {
    // const { username, password, action } = userInfo
    return new Promise((resolve, reject) => {
      const response = {
        accessToken: 'nY3WJOrNwryVxHlY59tdeG88bFh8vXeXJN69iPE0/jCrEPWeh+7DiZ95dhC57SOBse1EXKhU1/Qqj8plQ6jbzw==',
        userInfo: {
          roles: ['admin'],
          account: '10075071',
          fullName: '史邦麾'
        }
      }
      const { accessToken, userInfo } = response
      commit('SET_TOKEN', accessToken)
      setToken(accessToken)
      commit('SET_USER_INFO', userInfo)
      setObject('userInfo', userInfo)
      resolve()

    //   login(username.trim(), password, action)
    //     .then(response => {
    //       const { accessToken, userInfo } = response
    //       commit('SET_TOKEN', accessToken)
    //       setToken(accessToken)
    //
    //       if (userInfo.roles && userInfo.roles.length === 0) {
    //         userInfo.roles = ['tempRoles']
    //       }
    //       commit('SET_USER_INFO', userInfo)
    //       setObject('userInfo', userInfo)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    })
  },

  // 刷新页面后，没有roles，当路由守卫走到try catch获取roles时，在内部调用setRoles，把存在localstorage里的userInfo里的roles存入state的roles里，跳出try catch
  setRoes({ commit, state }) {
    return new Promise(resolve => {
      commit('SET_ROLES', state.userInfo.roles)
      resolve(state.userInfo)
    })
  },
  // get userInfo info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getUserInfo().then(response => {
  //       const { userInfo, roles, permissions, businesses } = response
  //
  //       if (!userInfo) {
  //         reject('验证失败，请重新登录!')
  //       }
  //
  //       const { username, avatarUrl } = userInfo
  //
  //       // roles must be a non-empty array
  //       if (!roles || roles.length <= 0) {
  //         reject('getInfo: 角色必须为非空数组')
  //       }
  //
  //       commit('SET_ROLES', roles)
  //       commit('SET_PERMISSIONS', permissions)
  //       commit('SET_BUSINESSES', businesses)
  //       commit('SET_NAME', username)
  //       commit('SET_AVATAR', avatarUrl)
  //       commit('SET_USER_INFO', userInfo)
  //       resolve(response)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // userInfo logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USER_INFO', undefined)
      removeToken()
      resetRouter()
      clearAll()
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USER_INFO', undefined)
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, roles) {
    return new Promise(async resolve => {
      resetRouter()
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })
      // dynamically add accessible routes
      router.addRoutes(accessRoutes)
      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
