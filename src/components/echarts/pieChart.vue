<template>
  <div ref="canvas" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import baseChart from './index'
export default {
  name: 'PieChart',
  extends: baseChart,
  props: {
    radius: {
      type: [String, Array],
      default: '50%'
    },
    center: {
      type: Array,
      default() { return ['40%', '50%'] }
    }
  },
  data() {
    return {
    }
  },
  created() {
    this.series[0].type = 'pie'
    this.series[0].radius = this.radius
    this.series.center = this.center
    this.series[0].label = {
      normal: {
        formatter: function(val) {
          return `${val.name} \n ${val.data.value} {per| ${val.percent}%} \n`
        },
        rich: {
          per: {
            color: '#eee',
            backgroundColor: '#334455',
            padding: [1, 4],
            borderRadius: 2
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
