import request from '@/utils/request'

export function login(username, password, action) {
  return request.post('', { username: username, password: password, action: action })
}
