import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import 'font-awesome/css/font-awesome.min.css'
import '@/styles/index.scss' // global css
import '@/styles/mall.scss'

import App from './app'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import VueCropper from 'vue-cropper'
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
Vue.use(VueCropper)
Vue.use(VuePhotoZoomPro)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import dataV from '@jiaminghi/data-view'

import VueVideoPlayer from 'vue-video-player'
// require videojs style
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

import * as filters from './filters' // global filters

// region HackTech Components
import HtTable from '@/components/HtTable'
import HtForm from '@/components/HtForm'
import HtSelect from '@/components/HtSelect'
import HtButton from '@/components/HtButton'
import HtPagination from '@/components/HtPagination'
import HtActionPanel from '@/components/HtActionPanel'
import HtTableColumnOperation from '@/components/HtTableColumnOperation'
import HtTableColumn from '@/components/HtTableColumn'
import HtPopoverButton from '@/components/HtPopoverButton'
import HtHelpTag from '@/components/HtHelpTag'
import HtDialog from '@/components/HtDialog'
import HtUploadPanel from '@/components/HtUploadPanel'
import HtDownloadLink from '@/components/HtDownloadLink'
import HtSwitch from '@/components/HtSwitch'
import HtFileFormItem from '@/components/HtFileFormItem'
import HtRetentiveTabs from '@/components/HtRetentiveTabs'
import HtCard from '@/components/HtCard'
import AppTable from '@/components/table'
import VueQr from 'vue-qr'
import HtPrint from '@/components/HtPrint'

Vue.component('VueQr', VueQr)
Vue.component('HtPrint', HtPrint)
Vue.component(AppTable.name, AppTable)
Vue.component(HtTable.name, HtTable)
Vue.component(HtForm.name, HtForm)
Vue.component(HtSelect.name, HtSelect)
Vue.component(HtPagination.name, HtPagination)
Vue.component(HtActionPanel.name, HtActionPanel)
Vue.component(HtUploadPanel.name, HtUploadPanel)
Vue.component(HtButton.name, HtButton)
Vue.component(HtTableColumn.name, HtTableColumn)
Vue.component(HtTableColumnOperation.name, HtTableColumnOperation)
Vue.component(HtPopoverButton.name, HtPopoverButton)
Vue.component(HtHelpTag.name, HtHelpTag)
Vue.component(HtDialog.name, HtDialog)
Vue.component('HtDownloadLink', HtDownloadLink)
Vue.component('HtSwitch', HtSwitch)
Vue.component('HtFileFormItem', HtFileFormItem)
Vue.component(HtRetentiveTabs.name, HtRetentiveTabs)
Vue.component('HtCard', HtCard)

// Vue-moment
const moment = require('moment')
require('moment/locale/zh-cn')
Vue.use(require('vue-moment'), {
  moment
})

Vue.use(Element, {
  size: 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(Viewer, { defaultOptions: { zIndex: 9999 }})
Vue.use(dataV)
Vue.use(VueVideoPlayer)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
