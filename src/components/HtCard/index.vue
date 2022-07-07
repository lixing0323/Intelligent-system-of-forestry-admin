<template>
  <el-card
    :class="{'no-border': !isCard}"
    :body-style="{padding: isCard?'20px':'0'}"
    :shadow="isCard?'always':'never'"
  >
    <slot />
  </el-card>
</template>

<script>

export default {
  components: { },
  props: {
    isCard: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .no-border {
    border: 0 !important;
  }
</style>
