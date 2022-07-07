<template>
  <div class="audit-panel">
    <div class="audit-row">
      <slot name="top" />
    </div>
    <div class="audit-row">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtAuditPanel'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .audit-panel {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;

    .audit-row {
      display: -webkit-flex;
      display: flex;
      align-items: center;
      :not(:last-child) {
        margin-right: 10px;
      }
    }
  }
</style>
