<template>
  <span>
    <el-option
      v-for="(key, index) in Object.keys(options)"
      :key="index"
      :label="options[key]"
      :value="key"
    />
  </span>
</template>

<script>

export default {
  name: 'HtOptions',
  props: { options: { type: Object, default: null }}
}
</script>
