<script>
import { Table } from 'element-ui'
export default {
  name: 'HtTable',
  extends: Table,
  props: {
    headerCellStyle: {
      type: [Object, Function],
      default: function() {
        return { color: '#2A9A30', 'background-color': '#1B232C', 'border': '1px solid #384251' }
      }
    },
    rowStyle: {
      type: [Object, Function],
      default: function() {
        return { color: '#FFF', 'background-color': '#1B232C', 'border': '1px solid #384251' }
      }
    },
    cellStyle: {
      type: [Object, Function],
      default: function() {
        return { color: '#FFF', 'background-color': '#1B232C', 'border': '1px solid #384251' }
      }
    },
    fit: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: [Number, String],
      default: 776
    },
    size: {
      type: String,
      default: 'mini'
    }
  }
}
</script>
