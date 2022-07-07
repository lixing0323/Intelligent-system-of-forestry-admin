import request from '@/utils/request'

const PLOT = 'plot'

export function getPlotData(id) {
  return request({ url: `${PLOT}/${id}`, method: 'GET' })
}
