<script>
import HtButton from '@/components/HtButton'
export default {
  name: 'HtButtonAdd',
  extends: HtButton,
  props: {
    type: {
      type: String,
      default: 'success'
    },
    label: {
      type: String,
      default: '新增'
    },
    icon: {
      type: String,
      default: 'el-icon-plus'
    }
  }
}
</script>
