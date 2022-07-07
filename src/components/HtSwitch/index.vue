<script>
import { Switch } from 'element-ui'
export default {
  name: 'HtSwitch',
  extends: Switch,
  props: {
    activeColor: {
      type: String,
      default: 'limegreen'
    }
  }
}
</script>
