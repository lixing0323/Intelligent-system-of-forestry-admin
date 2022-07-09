import request from '@/utils/request'

const PLOT_SURVEY = 'plot_survey'

export function getPlotSurveyList(params) {
  return request({ url: `${PLOT_SURVEY}`, method: 'get', params: params })
}

export function createPlotSurvey(data) {
  return request({ url: `${PLOT_SURVEY}`, method: 'post', data: data })
}

export function updatePlotSurveyItem(id, data) {
  return request({ url: `${PLOT_SURVEY}/${id}`, method: 'put', data: data })
}

export function deletePlotSurveyItem(id) {
  return request({ url: `${PLOT_SURVEY}/${id}`, method: 'delete' })
}
