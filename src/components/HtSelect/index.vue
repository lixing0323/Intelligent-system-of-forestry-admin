<template>
  <el-select
    v-model="modelValue"
    filterable
    :remote="remote"
    clearable
    :disabled="disabled"
    :multiple="multiple"
    :reserve-keyword="multiple"
    default-first-option
    :placeholder="placeholder"
    :loading="isLoading"
    :remote-method="onQuery"
    value=""
    style="width: 100%"
    @clear="modelValue=null"
  >
    <slot :options="options" />
  </el-select>
</template>

<script>

export default {
  name: 'HtSelect',
  props: {
    value: {
      type: [Number, Array],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入关键词查询'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modelValue: null,
      isLoading: false,
      options: [],
      initOptions: []
    }
  },
  watch: {
    modelValue(value) {
      this.$emit('update:value', value)
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    queryOptions(queryStr) {
      // Implement in sub class
    },
    getData() {
      // Implement in sub class
    },
    setValue(value) {
      this.modelValue = value
    },
    setOptions(resp) {
      this.initOptions = resp
      this.options = resp
    },
    onQuery(queryStr) {
      if (queryStr === undefined) {
        return
      }
      this.queryOptions(queryStr)
    }
  }
}
</script>
