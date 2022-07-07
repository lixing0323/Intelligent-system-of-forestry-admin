<script>
export default {
  name: 'HtList',
  props: {
    isLoading: { type: Boolean, default: false },
    list: { type: Array, default() { return [] } },
    listQuery: { type: Object, default() { return {} } },
    selectionMode: { type: Boolean, default: false },
    page: { type: Object, default() { return { total: 0 } } },
    onSearch: { type: Function, default: undefined },
    onClear: { type: Function, default: undefined },
    getList: { type: Function, default: undefined },
    enableSearch: { type: Boolean, default: true },
    tableOnly: { type: Boolean, default: false },
    maxTableHeight: { type: [Number, String], default: 776 },
    tableTitles: { type: Array, default: undefined }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  methods: {
    onSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('selection-change', val)
    },
    clearSelection() {
      if (this.$refs.table !== undefined) {
        this.$refs.table.clearSelection()
      }
    },
    listIndex(index) {
      return (this.page.currentPage - 1) * this.page.perPage + index + 1
    },
    pagination() {
      this.$emit('pagination')
    }
  }
}
</script>
