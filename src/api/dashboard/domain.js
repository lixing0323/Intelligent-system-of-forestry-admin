import request from '@/utils/request'

const DOMAIN = 'domain'

export function getDomainData(listQuery) {
  return request({ url: `${DOMAIN}`, method: 'GET', params: listQuery })
}
