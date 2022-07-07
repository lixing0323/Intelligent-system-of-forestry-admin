<script>
import { TableColumn } from 'element-ui'
export default {
  name: 'HtTableColumnIndex',
  extends: TableColumn,
  props: {
    type: {
      type: String,
      default: 'index'
    },
    // width: {
    //   type: [String, Number],
    //   default: '55'
    // },
    label: {
      type: String,
      default: '序号'
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'center'
    }
  }
}
</script>
