<template>
  <el-row :gutter="10" style="width: 100%">
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
      <slot />
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HtAutoWidthRow'
}
</script>

<style lang="scss" scoped>
</style>
