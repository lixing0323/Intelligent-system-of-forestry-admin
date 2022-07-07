import request from '@/utils/request'

const CARBON_SINK = 'carbon_sink'

export function getCarbonSinkData(listQuery) {
  return request({ url: `${CARBON_SINK}`, method: 'GET', params: listQuery })
}
