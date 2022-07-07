<template>
  <el-tooltip :content="tooltip" placement="top" effect="light" :open-delay="300">
    <span class="mall-link-highlight mall-font-size-default">
      <i class="el-icon-question" />
    </span>
  </el-tooltip>
</template>
<script>
export default {
  name: 'HtHelpTag',
  props: {
    tooltip: {
      type: String,
      default: '帮助'
    }
  }
}
</script>
