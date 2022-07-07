<template>
  <el-form-item :label="label" :prop="prop">
    <el-input v-model="form[prop]" :readonly="true" style="display: none" />
    <template>
      <ht-upload-button
        v-if="editMode"
        file-type="all"
        :key-prefix="keyPrefix"
        @on-file-uploaded="onFileUploaded"
      />
      <ht-popover-button v-if="form[prop]&&editMode" type="danger" icon="el-icon-delete" confirm-title="是否删除?" @confirmed="onDeleteFile">
        删除
      </ht-popover-button>
      <ht-download-link v-if="form[prop]" class="download-link" :link-url="form[prop]" link-title="下载" />
    </template>
  </el-form-item>
</template>
<script>
export default {
  name: 'HtFileFormItem',
  props: {
    keyPrefix: {
      type: String,
      default: 'temp/files'
    },
    label: {
      type: String,
      default: ''
    },
    form: {
      type: Object,
      default: null
    },
    prop: {
      type: String,
      default: ''
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onFileUploaded(context, url) {
      this.form[this.prop] = url
    },
    onDeleteFile() {
      this.form[this.prop] = null
    }
  }
}
</script>

<style lang="scss" scoped>
  .download-link {
    margin-left: 5px;
  }
</style>
