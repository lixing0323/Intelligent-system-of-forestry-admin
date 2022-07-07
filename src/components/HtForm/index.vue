<script>
import { Form } from 'element-ui'
export default {
  name: 'HtForm',
  extends: Form,
  props: {
    statusIcon: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'mini'
    },
    labelWidth: {
      type: String,
      default: '110px'
    },
    labelSuffix: {
      type: String,
      default: ':'
    }
  }
}
</script>
