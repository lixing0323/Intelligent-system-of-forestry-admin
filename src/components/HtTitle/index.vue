<template>
  <span class="title-content">
    <span class="title">{{ title }}</span><slot name="content"><span v-if="content">{{ content }}</span></slot>
  </span>
</template>

<script>
export default {
  name: 'HtTitle',
  props: {
    title: { type: String, default: '' },
    content: { type: [String, Number], default: null }
  }
}
</script>

<style lang="scss" scoped>
  .title-content {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    color: #333333;
    .title {
      font-weight: bold;
      &:after {
        content: ': ';
      }
    }
  }
</style>
