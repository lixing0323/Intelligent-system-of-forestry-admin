import request from '@/utils/request'

export function resetPassword(oldPassword, newPassword) {
  return request({ url: 'admin/userInfo/change_self_password', method: 'put', data: { oldPassword: oldPassword, newPassword: newPassword }})
}

export function simpleResetPasswordApi(uuid) {
  return request({ url: `admin/staffs/${uuid}`, method: 'post' })
}
