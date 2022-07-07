<script>
import { TableColumn } from 'element-ui'
export default {
  name: 'HtTableColumnOperation',
  extends: TableColumn,
  props: {
    className: {
      type: String,
      default: 'business-table-operation-column'
    },
    align: {
      type: String,
      default: 'center'
    },
    label: {
      type: String,
      default: '操作'
    },
    fixed: {
      type: [Boolean, String],
      default: 'right'
    }
  }
}
</script>
