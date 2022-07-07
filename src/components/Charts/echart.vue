<template>
  <div ref="canvas" class="v-chart" :style="canvasStyle" />
</template>

<script>
import _object from 'lodash/object'

const ECharts = require('echarts') || undefined
if (ECharts === undefined) {
  console.error('ECharts is not defined')
}

(function() {
  const throttle = function(type, name, obj) {
    obj = obj || window
    let running = false
    const func = function() {
      if (running) { return }
      running = true
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name))
        running = false
      })
    }
    obj.addEventListener(type, func)
  }
  /* init - you can init any event */
  throttle('resize', 'optimizedResize')
})()

export default {
  name: 'EChart',
  props: {
    // args of  ECharts.init(dom, theme, opts)
    width: { type: String, default: 'auto' },
    height: { type: String, default: '400px' },
    merged: {
      type: Boolean,
      default: true
    },
    // instace.setOption
    pathOption: { type: [Object, Array], default() { return {} } },
    option: {
      type: Object,
      default: () => {}
    },
    // general config
    textStyle: {
      type: Object,
      default: () => {}
    },
    title: {
      type: Object,
      default: () => {}
    },
    legend: { type: [Object, Array], default() { return {} } },
    tooltip: {
      type: Object,
      default: () => {}
    },
    grid: { type: [Object, Array], default() { return {} } },
    xAxis: { type: [Object, Array], default() { return {} } },
    yAxis: { type: [Object, Array], default() { return {} } },
    series: { type: [Object, Array], default() { return {} } },
    axisPointer: {
      type: Object,
      default: () => {}
    },
    dataset: { type: [Object, Array], default() { return {} } }, // option.dataSet
    colors: {
      type: Array,
      default: () => []
    }, // echarts.option.color
    backgroundColor: { type: [Object, String], default: null },
    toolbox: { type: [Object, Array], default() { return {} } },
    // resize delay
    widthChangeDelay: {
      type: Number,
      default: 450
    }
  },
  data() {
    return {
      app: { currentIndex: -1 },
      chartInstance: null,
      clientWidth: null,
      allowedOptions: [
        'textStyle', 'title', 'legend', 'xAxis',
        'yAxis', 'series', 'tooltip', 'axisPointer',
        'grid', 'dataset', 'colors', 'backgroundColor'
      ],
      defaultOption: {
        tooltip: {
          show: true,
          trigger: 'item',
          position: 'top',
          backgroundColor: 'rgba(255,255,255,0.9)',
          textStyle: {
            color: 'black'
          }
        },
        title: {
          show: true,
          textStyle: {
            color: 'rgba(0, 0, 0 , .87)',
            fontFamily: 'sans-serif'
          }
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          show: true,
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0 , .54)',
              type: 'dashed'
            }
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              show: true,
              color: 'rgba(0, 0, 0 , .54)',
              type: 'dashed'
            }
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          show: true,
          type: 'value',
          data: [],
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0 , .54)',
              type: 'dashed'
            }
          },
          axisLabel: {
            show: false
            // color: 'rgba(0, 0, 0 , .54)'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              show: true,
              color: 'rgba(0, 0, 0 , .54)',
              type: 'dashed'
            }
          }
        },
        series: [{
          type: 'line',
          avoidLabelOverlap: true
        }],
        animation: true,
        animationDuration: 3000,
        animationEasing: 'linear'
      }
    }
  },
  computed: {
    canvasStyle() {
      return {
        width: this.width,
        height: this.height
      }
    }

  },
  watch: {
    pathOption: {
      deep: true,
      handler() {
        this.setOption()
      }
    }
  },
  mounted() {
    this.init()
  },

  beforeDestroy() {
    this.clean()
  },
  methods: {
    init() {
      // set
      this.chartInstance = ECharts.init(this.$refs.canvas, 'material')
      this.setOption()
      window.addEventListener('optimizedResize', (e) => {
        setTimeout(_ => {
          this.chartInstance.resize()
        }, this.widthChangeDelay)
      })
      const that = this
      this.chartInstance.on('click', function(params) {
        that.$emit('onClick', params)
      })
    },

    resize() {
      this.chartInstance.resize()
    },
    clean() {
      window.removeEventListener('resize', this.chartInstance.resize)
      this.chartInstance.clear()
    },
    setOption() {
      if (this.pathOption) {
        this.pathOption.forEach((p) => {
          _object.set(this.$data.defaultOption, p[0], p[1])
        })
      }
      this.chartInstance.setOption(_object.merge(this.option, this.$data.defaultOption))
    },
    show() {
      const dataLen = this.$data.defaultOption.series[0].data.length
      // 取消之前高亮的图形
      this.chartInstance.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: this.app.currentIndex
      })
      this.app.currentIndex = (this.app.currentIndex + 1) % dataLen
      // 高亮当前图形
      this.chartInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.app.currentIndex
      })
      // 显示 tooltip
      this.chartInstance.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.app.currentIndex
      })
    }
  }
}
</script>

<style scoped>

</style>
