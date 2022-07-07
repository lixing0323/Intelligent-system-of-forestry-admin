<script>
import CountTo from 'vue-count-to'
export default {
  name: 'HtCountNumber',
  extends: CountTo,
  props: {
    separator: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3600
    },
    decimals: {
      type: Number,
      default: 2
    }
  }
}
</script>
