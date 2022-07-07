<template>
  <el-tooltip :content="tooltip||decodeURI(linkUrl)" placement="top" effect="light" :open-delay="300">
    <template v-if="isDownload">
      <el-link size="mini" :href="linkUrl" download="下载附件" target="_blank" icon="el-icon-link" type="primary">
        {{ linkTitle }}
      </el-link>
    </template>
    <template v-else>
      <el-link size="mini" :href="linkUrl" target="_blank" icon="el-icon-link" type="primary">
        {{ linkTitle }}
      </el-link>
    </template>
  </el-tooltip>
</template>

<script>
export default {
  name: 'HtDownloadLink',
  props: {
    linkUrl: {
      type: String,
      default: ''
    },
    linkTitle: {
      type: String,
      default: '下载'
    },
    tooltip: {
      type: String,
      default: null
    },
    isDownload: {
      type: Boolean,
      default: true
    }
  }
}
</script>
