<template>
  <div>
    <div v-show="show" :ref="id">
      <slot />
    </div>
  </div>
</template>

<script>
// 打印组件
export default {
  name: 'Print',
  props: {
    // id
    id: {
      type: String,
      default: 'print-component'
    },
    // 是否显示
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let printI = document.getElementById('printIframe')
      if (!printI) {
        printI = document.createElement('iframe')
        printI.id = 'printIframe'
        printI.style.position = 'fixed'
        printI.style.width = '0'
        printI.style.height = '0'
        printI.style.top = '-100px'
        // 兼容ie
        if (
          window.location.hostname !== document.domain &&
          navigator.userAgent.match(/msie/i)
        ) {
          printI.src =
            'javascript:document.write("<head><script>document.domain=\\"' +
            document.domain +
            '\\";</s' +
            'cript></head><body></body>")'
        }
        printI.onload = () => {
          this.getStyle()
        }

        document.body.appendChild(printI)
      } else {
        this.getStyle()
      }
    },
    print() {
      const $iframe = document.getElementById('printIframe')
      // 复制body，打印内容
      $iframe.contentDocument.body.innerHTML = this.$refs[this.id].innerHTML
      setTimeout(() => {
        $iframe.contentWindow.print()
      }, 100)
    },
    getStyle() {
      const printI = document.getElementById('printIframe')
      let str = ''
      const styles1 = document.querySelectorAll('style')
      for (var i = 0; i < styles1.length; i++) {
        str += styles1[i].outerHTML
      }
      printI.contentDocument.head.innerHTML = str
      // 添加link引入
      const styles = document.querySelectorAll('link')
      for (let i = 0; i < styles.length; i++) {
        // chrome 正常，firefox不正常，能执行到，但是添加没结果
        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        if (styles[i].type) link.setAttribute('type', styles[i].type)
        else link.setAttribute('type', 'text/css')
        if (styles[i].href.indexOf('favicon.ico') === -1) {
          link.setAttribute('href', styles[i].href)
        }
        link.setAttribute('media', 'all')
        printI.contentDocument.head.appendChild(link)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
