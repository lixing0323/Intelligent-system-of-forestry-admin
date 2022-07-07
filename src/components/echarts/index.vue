<script>
import echarts from 'echarts'
import { debounce } from '@/utils'

export default {
  props: {
    text: {
      type: String,
      default: undefined
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: { type: String, default: 'auto' },
    height: { type: String, default: '400px' },
    autoResize: {
      type: Boolean,
      default: true
    },
    // 数据
    chartData: {
      type: Array,
      default: undefined
    },
    // 图例
    legendData: {
      type: Array,
      default: undefined
    },
    // 横轴的坐标标签
    xAxisData: {
      type: Array,
      default: undefined
    },
    yAxisData: {
      type: Array,
      default: undefined
    },
    // y轴的标签
    yAxisName: {
      type: String,
      default: ''
    },
    // y轴坐标值最小间隔值
    minInterval: { type: Number, default: undefined },
    // x轴的标签
    xAxisName: {
      type: String,
      default: ''
    },
    // eCharts标题
    title: {
      type: Object,
      default() { return { text: this.text, textStyle: { color: 'white' }} }
    },
    // 鼠标浮上动画
    tooltipFormatter: {
      type: String,
      default() {
        return this.type === 'pie' ? ` {a0} <br/> {b0} : {c} ({d}%)` : `{a0} <br/> {b0} : {c}`
      }
    },
    series: {
      type: Array,
      default() {
        return [{
          type: this.type,
          data: this.chartData,
          avoidLabelOverlap: true,
          name: this.text,
          emphasis: { itemStyle: { color: undefined }}
        }]
      }
    },
    // 引导栏
    legend: {
      type: Object,
      default() {
        return {
          left: '30%',
          top: '0%',
          textStyle: {
            fontSize: 12, // 字体大小
            color: 'black'// 字体颜色
          },
          // 文字过长换行
          formatter: function(params) {
            let tip1 = ''
            let tip = ''
            const le = params.length // 图例文本的长度
            if (le > 10) { // 几个字换行大于几就可以了
              const l = Math.ceil(le / 10) // 有些不能整除，会有余数，向上取整
              for (let i = 1; i <= l; i++) { // 循环
                if (i < l) { // 最后一段字符不能有\n
                  tip1 += params.slice(i * 10 - 10, i * 10) + '\n' // 字符串拼接
                } else if (i === l) { // 最后一段字符不一定够9个
                  tip = tip1 + params.slice((l - 1) * 10, le) // 最后的拼接在最后
                }
              }
              return tip
            } else {
              tip = params // 前面定义了tip为空，这里要重新赋值，不然会替换为空
              return tip
            }
          },
          padding: [30, 5, 10, 5], // //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          itemHeight: 13, // 图例标记的图形宽度
          itemWidth: 13, // 图例标记的图形高度
          itemGap: 9, // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
          icon: 'rect', // 矩形
          data: this.xDataValue
        }
      }
    },
    // 引导栏是否显示
    legendIsShow: {
      type: Boolean,
      default: true
    },
    // 柱状图柱子label
    axisLabelStyle: {
      type: Object,
      default() {
        return {
          textStyle: {}
        }
      }
    },
    xAxisType: {
      type: String,
      default: 'category'
    },
    yAxisType: {
      type: String,
      default: 'value'
    },
    isShowDataZoom: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      type: undefined,
      app: { currentIndex: -1 }
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
    series: {
      deep: true,
      handler() {
        this.setOptions(this.chartData)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    // const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    // sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    if (sidebarElm) {
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)
    }

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions() {
      this.chart.setOption({
        xAxis: {
          type: this.xAxisType,
          data: this.xAxisData,
          name: this.xAxisName,
          axisTick: {
            show: false
          },
          // 设置坐标轴字体颜色和宽度
          axisLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: this.axisLabelStyle
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: this.yAxisType,
          data: this.yAxisData,
          name: this.yAxisName,
          minInterval: this.minInterval,
          // 设置坐标轴字体颜色和宽度
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          // y轴标签
          axisLabel: {
            textStyle: this.axisLabelStyle
          }
        },
        dataZoom: this.isShowDataZoom ? [{ type: 'inside' }] : undefined,
        grid: {
          containLabel: true,
          y2: 0
        },
        tooltip: {
          show: true,
          trigger: 'item',
          position: 'top',
          backgroundColor: 'rgba(255,255,255,0.9)',
          textStyle: {
            color: 'black'
          },
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10],
          formatter: this.tooltipFormatter
        },
        legend: this.legendIsShow ? this.legend : undefined,
        series: this.series,
        title: this.title
      })
    },
    initChart() {
      this.chart = echarts.init(this.$refs.canvas)
      this.setOptions(this.chartData)
      const that = this
      this.chart.on('click', function(params) {
        if (that.series[0].type === 'bar' && that.isShowDataZoom) {
          that.dataZoom(params)
        }
        that.$emit('click', params)
      })
    },
    show() {
      const dataLen = this.series[0].data.length
      // 取消之前高亮的图形
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: this.app.currentIndex
      })
      this.app.currentIndex = (this.app.currentIndex + 1) % dataLen
      // 高亮当前图形
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.app.currentIndex
      })
      // 显示 tooltip
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.app.currentIndex
      })
    }
  }
}
</script>
