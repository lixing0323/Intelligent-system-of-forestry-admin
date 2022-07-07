<script>
import { TableColumn } from 'element-ui'
export default {
  name: 'HtTableColumnSelection',
  extends: TableColumn,
  props: {
    type: {
      type: String,
      default: 'selection'
    },
    width: {
      type: [String, Number],
      default: '55'
    },
    align: {
      type: String,
      default: 'center'
    },
    reserveSelection: {
      type: Boolean,
      default: true
    },
    min: {
      type: [String, Number],
      default: 1
    }
  }
}
</script>
