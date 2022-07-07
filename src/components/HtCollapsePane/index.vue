<template>
  <div>
    <el-row :gutter="10" justify="space-between" class="title-row">
      <el-col :span="20">
        <div :style="titleClass">
          <slot name="title" :activated="!collapsed">
            <span>折叠面板</span>
          </slot>
          <slot name="operation" :activated="!collapsed" />
        </div>
      </el-col>
      <el-col :span="4">
        <el-link type="primary" style="float: right" @click="onToggleCollapse">{{ collapseTitle }} <i ref="collapseButton" :class="collapseButtonIcon" /></el-link>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="!collapsed">
        <slot name="content" />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'HtCollapsePane',
  props: {
    initCollapsed: { type: Boolean, default: true },
    title: { type: String, default: '' },
    hideTitleActivated: { type: Boolean, default: false }
  },
  data() {
    return {
      collapsed: this.initCollapsed
    }
  },
  computed: {
    collapseButtonIcon() {
      if (this.collapsed) {
        return 'el-icon-arrow-right'
      } else {
        return 'el-icon-arrow-down'
      }
    },
    collapseTitle() {
      if (this.collapsed) {
        return '展开'
      } else {
        return '收起'
      }
    },
    hideTitle() {
      return this.hideTitleActivated && !this.collapsed
    },
    titleClass() {
      if (this.hideTitle) {
        return 'visibility: hidden;'
      } else {
        return 'visibility: visible;'
      }
    }
  },
  methods: {
    onToggleCollapse() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="scss">
  .title-row {
    margin-bottom: 10px;
  }
</style>
