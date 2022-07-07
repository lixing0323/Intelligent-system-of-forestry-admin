<script>
import { Dialog } from 'element-ui'
export default {
  name: 'HtDialog',
  extends: Dialog,
  props: {
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '5vh'
    },
    center: {
      type: Boolean,
      default: true
    }
  }
}
</script>
