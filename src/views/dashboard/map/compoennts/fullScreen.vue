<template>
  <div class="screen-full">
    <el-tooltip :content="getTooltipContent()" effect="dark" placement="bottom">
      <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { mapGetters } from 'vuex'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters(['fullscreenStatus'])
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
      this.$store.dispatch('settings/changeFullScreen', this.isFullscreen)
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
      this.isFullscreen = this.fullscreenStatus
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    },
    getTooltipContent() {
      return this.isFullscreen ? '退出全屏' : '全屏显示'
    }
  }
}
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  cursor: pointer;
  fill: #2A9A30;
  width: 30px;
  height: 30px;
  font-weight: bold;
  vertical-align: 10px;
}
</style>
