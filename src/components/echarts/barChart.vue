<template>
  <div ref="canvas" :class="className" :style="canvasStyle" />
</template>

<script>
import baseChart from './index'
import echarts from 'echarts'
export default {
  name: 'BarChart',
  extends: baseChart,
  props: {
    // 是否显示背景条阴影色
    isShowBackground: {
      type: Boolean,
      default: true
    },
    barColor: {
      type: [String, Object],
      default() {
        let color
        if (this.xAxisType === 'value') {
          color = '#3398DB'
        } else {
          color = new echarts.graphic.LinearGradient(
            0, 0, 0, 2,
            [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ]
          )
        }
        return color
      }
    }
  },
  created() {
    this.title.color = 'white'
    this.series[0].type = 'bar'
    this.series[0].showBackground = this.isShowBackground
    // 柱子渐变色
    if (!this.series[0].emphasis.itemStyle.color) {
      this.series[0].emphasis.itemStyle.color = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [
          { offset: 0, color: '#2378f7' },
          { offset: 0.7, color: '#2378f7' },
          { offset: 1, color: '#83bff6' }
        ]
      )
    }
    if (this.series.length === 1) {
      this.series[0].color = this.barColor
      // 柱子连线
      this.series[1] = {
        name: this.text,
        type: 'line',
        data: this.chartData,
        symbol: 'circle',
        symbolSize: 13,
        color: '#f17b12'
      }
    }
  },
  methods: {
    dataZoom(params) {
      const zoomSize = 6
      this.chart.dispatchAction({
        type: 'dataZoom',
        startValue: this.xAxisData[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: this.xAxisData[Math.min(params.dataIndex + zoomSize / 2, this.chartData.length - 1)]
      })
    }
  }
}
</script>

<style scoped>

</style>
