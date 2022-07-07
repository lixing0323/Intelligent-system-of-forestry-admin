<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <ht-button type="text">{{ dropdownName }}<i class="el-icon-arrow-down el-icon--right" /></ht-button>
    <el-dropdown-menu slot="dropdown">
      <slot name="dropdown-items" />
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'HtDropdown',
  props: {
    dropdownName: { type: String, default: '下拉菜单' },
    handleCommand: { type: Function, default: null, required: true },
    disabled: {
      type: Boolean,
      default: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
