import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param permissions
 * @param route
 */
function hasRoles(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role === role)
  } else {
    return true
  }
}

// 递归删除路由
export function deleteAsyncRouter(routes, names) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (names.indexOf(tmp.name) === -1) {
      if (tmp.children) {
        tmp.children = deleteAsyncRouter(tmp.children, names)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param permissions
 */
export function filterAsyncRoutes(routes, permissions) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasRoles(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  deleteRouters: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  DELETE_ROUTES: (state, name) => {
    if (state.deleteRouters.indexOf(name) === -1) {
      state.deleteRouters.push(name)
    }
  },
  REFRESH_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles, userInfo) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  // 添加删除的路径
  addDeleteRouter({ commit }, name) {
    return new Promise(resolve => {
      commit('DELETE_ROUTES', name)
      resolve(name)
    })
  },
  // 改变路由
  changeRouter({ commit }, permissions) {
    return new Promise(resolve => {
      const accessedRoutes = deleteAsyncRouter(asyncRoutes, state.deleteRouters)
      const routes = filterAsyncRoutes(accessedRoutes, permissions)
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  },
  // 清空删除的路径
  clearRouter({ commit }) {
    return new Promise(resolve => {
      state.deleteRouters = []
      resolve([])
    })
  },
  // 清除所有的路由，只剩下dashboard
  deleteAsyncRouter({ commit }) {
    return new Promise(resolve => {
      const accessedRoutes = {}
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
