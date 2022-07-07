<template>
  <span v-if="value!==undefined">
    <el-tag v-if="value" type="success">是</el-tag>
    <el-tag v-else type="danger">否</el-tag>
  </span>
</template>

<script>
export default {
  name: 'HtYesNoTags',
  props: {
    value: { type: Boolean, default: undefined }
  }
}
</script>

<style scoped>

</style>
