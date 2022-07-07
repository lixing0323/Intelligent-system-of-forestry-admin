import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

const TIMEOUT_MS = 60000
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: TIMEOUT_MS // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['Authorization'] = `JWT ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.status === 0) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.errCode === 401) {
        // to re-login
        MessageBox.confirm(res.errMsg, '信息', { confirmButtonText: '确定', showCancelButton: false, type: 'warning' })
          .then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
      } else {
        Message({ message: res.errMsg || 'Error', type: 'error', duration: 2000 })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      Message({ message: `响应时间超过 ${TIMEOUT_MS / 1000} 秒`, type: 'error', duration: 3 * 1000 })
    } else {
      Message({ message: error.message, type: 'error', duration: 3 * 1000 })
    }
    return Promise.reject(error)
  }
)

export default service
