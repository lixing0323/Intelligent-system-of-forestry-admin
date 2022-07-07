<script>
import { queryParser } from '@/utils'
export default {
  name: 'HtListContainer',
  props: {
    enableReplaceBrowserUrl: { type: Boolean, default: true },
    maxTableHeight: { type: [Number, String], default: 776 },
    selectionMode: { type: Boolean, default: false }
  },
  data() {
    return {
      listQuery: { page: 1, perPage: 20 },
      pageSizes: [20, 50, 100, 200],
      page: { total: 0 },
      list: [],
      isLoading: false,
      dialogVisible: false,
      itemId: null,
      deletedTotal: null,
      total: {}
    }
  },
  created() {
    this.parseRouterQuery()
  },
  methods: {
    parseRouterQuery() {
      if (this.enableReplaceBrowserUrl) {
        queryParser(this.listQuery, this.$route.query)
      }
    },
    listIndex(index) {
      return (this.page.currentPage - 1) * this.page.perPage + index + 1
    },
    getRowKey(row) {
      if (row) {
        return row.id
      }
    },
    processListQuery() {},
    beforeGetList() {
      this.isLoading = true
      this.processListQuery()
    },
    afterGetList(response = null, error = null) {
      if (response) {
        this.list = response.items
        this.page = response.page
      }
      if (error) {
        console.log(error)
      }
      this.isLoading = false
    },
    getList() {},
    onSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    onClear(refresh = true) {
      Object.keys(this.listQuery).forEach(el => {
        if (el === 'page') {
          this.listQuery[el] = 1
        } else if (el !== 'perPage') {
          delete this.listQuery[el]
          delete this.listQuery[el]
        }
      })
      if (refresh) {
        this.getList()
        if (this.$refs.list !== undefined) {
          this.clearListSelection()
        }
      }
    },
    updateItem(item, index, closeDialog = false) {
      this.list.splice(index, 1, item)
      if (closeDialog) {
        this.closeDialog()
      }
    },
    onOpenDialog(data = null, index = null) {
      this.dialogVisible = true
      this.itemId = data ? data.id : null
      this.$nextTick(() => {
        this.$refs.form.initForm(data, index)
      })
    },
    closeDialog(refresh = true) {
      this.$refs.form.initForm()
      this.dialogVisible = false
      if (refresh) {
        this.getList()
      }
    },
    getListSelection(listRef = 'list') {
      return this.$refs[listRef].multipleSelection
    },
    clearListSelection(listRef = 'list') {
      return this.$refs[listRef].clearSelection()
    },
    onSelectionChange(val) {
      this.$emit('selection-change', val)
    },
    deleteItem(resp, index) {
      if (resp.deletedTotal === 1) {
        this.list.splice(index, 1)
      }
    }
  }
}
</script>
