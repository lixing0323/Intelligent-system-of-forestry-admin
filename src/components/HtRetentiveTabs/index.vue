<script>
import { Tabs } from 'element-ui'
import Cookies from 'js-cookie'
export default {
  name: 'HtRetentiveTabs',
  extends: Tabs,
  props: {
    viewName: {
      type: [String],
      default: ''
    }
  },
  watch: {
    value: function(newValue, oldValue) {
      if (this.viewName) {
        // keep last selected tab in 7 minutes, like the memory of fish
        const expireTime = new Date(new Date().getTime() + 7 * 60 * 1000)
        Cookies.set(this.viewName + '_tab', newValue, {
          expires: expireTime
        })
      }
    }
  },
  mounted() {
    if (this.viewName) {
      const lastSelectedTab = Cookies.get(this.viewName + '_tab')
      if (lastSelectedTab) {
        this.$emit('input', lastSelectedTab)
      }
    }
  }
}
</script>
