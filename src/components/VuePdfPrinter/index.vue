<template>
  <div>
    <div v-if="isShowButtons" class="buttons">
      <el-button type="text" @click="onPreview">预览</el-button>
      <el-button type="text" @click="onDownload">下载</el-button>
    </div>
    <slot />  <!-- slot for normal display -->
    <vue-html2pdf
      ref="html2Pdf"
      :show-layout="false"
      :float-layout="true"
      :enable-download="download"
      :preview-modal="preview"
      :manual-pagination="true"
      :pdf-content-width="pdfContentWidth"
      :html-to-pdf-options="html2PdfOptions"
    >
      <template v-slot:pdf-content> <!-- 具名插槽pdf-content提供给vue-html2pdf子组件的 -->
        <slot /> <!-- 匿名插槽供外部父组件使用 -->
      </template>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name: 'VuePdfPrinter',
  components: { VueHtml2pdf },
  props: {
    fileName: {
      // 下载文件名
      type: String,
      default: ('' + (new Date().getTime()))
    },
    pdfOrientation: {
      // pdf版面，横向/纵向
      type: String,
      default: 'landscape', // 默认横向
      validator: value => {
        return ['portrait', 'landscape'].indexOf(value) !== -1
      }
    },
    pdfContentWidth: {
      // pdf内容宽度
      type: [String, Number],
      default: 'auto'
    },
    isShowButtons: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      download: false,
      preview: false,
      html2PdfOptions: {
        // 内部参数，对html2pdf的更多定制设置
        // 参考文档: https://ekoopmans.github.io/html2pdf.js/#options
        margin: 0.2, // 对应jspdf单位，1in = 96px，0.2in约20px
        filename: `${this.fileName}.pdf`,
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        enableLinks: false,
        html2canvas: {
          scale: 2,
          useCORS: true,
          // 修正滚动问题:
          // https://github.com/eKoopmans/html2pdf.js/issues/175#issuecomment-634832966
          scrollX: 0,
          scrollY: 0
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: this.pdfOrientation
        }
      }

    }
  },
  methods: {
    onDownload() {
      this.download = true
      this.preview = false
      this.$nextTick(() => {
        this.$refs.html2Pdf.generatePdf()
      })
    },
    onPreview() {
      this.download = false
      this.preview = true
      this.$nextTick(() => {
        this.$refs.html2Pdf.generatePdf()
      })
    },
    setButtons(isShow) {
      this.isShowButtons = isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
