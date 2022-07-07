<template>
  <el-form-item>
    <ht-button v-if="cancelBtn" :type="cancelBtnType" :icon="cancelBtnIcon" size="mini" style="color: #7d7d7f" @click="onCancel()">取消</ht-button>
    <ht-button :type="buttonType" :icon="buttonIcon" :loading="isLoading" size="mini" @click="onSave()">
      {{ buttonTitle }}
    </ht-button>
  </el-form-item>
</template>
<script>
export default {
  name: 'HtFormSubmit',
  props: {
    isLoading: { type: Boolean, required: true, default: undefined },
    buttonType: { type: String, default: 'primary' },
    buttonTitle: { type: String, default: '保存' },
    buttonIcon: { type: String, default: 'el-icon-check' },
    cancelBtn: { type: Boolean, default: false },
    cancelBtnIcon: { type: String, default: '' },
    cancelBtnType: { type: String, default: 'text' }
  },
  methods: {
    onSave() {
      this.$emit('on-save-clicked')
    },
    onCancel() {
      this.$emit('on-cancel-clicked')
    }
  }
}
</script>
