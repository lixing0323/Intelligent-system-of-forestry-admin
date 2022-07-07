<template>
  <div>
    我是列表
    <el-button @click="gotoOne()">填写基本信息</el-button>
  </div>
</template>

<script>
// 列表
export default {
  components: {
  },
  props: {
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    // 跳转第一步
    gotoOne() {
      this.$router.push({ name: 'DataManagementOne', params: { id: String(0) }})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
