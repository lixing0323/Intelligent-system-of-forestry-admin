import { queryParser } from '@/utils'
const EMIT_EDIT_MODE_CHANGED = 'on-mode-changed'
const EMIT_ON_FORM_SAVED = 'on-form-saved'

function beforeUnload(e) {
  // Cancel the event
  e.preventDefault()
  // Chrome requires returnValue to be set
  e.returnValue = ''
}

export default {
  props: {
    replaceUrl: {
      type: Boolean,
      default: true
    },
    enableEditMode: {
      type: Boolean,
      default: false
    },
    enableConfirm: {
      type: Boolean,
      default: true
    },
    confirmMessage: {
      type: String,
      default: '是否保存修改？'
    },
    enableRouterParser: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentRow: null,
      editMode: false,
      editForm: {
        items: []
      },
      clonedForm: {},
      listQuery: {
        page: 1,
        perPage: 20
      },
      viewerOptions: { toolbaviewerOptionsr: true, url: 'data-source' },
      pageSizes: [20, 50, 100, 200, 500],
      page: { total: 0 },
      list: [],
      isLoading: false,
      maxTableHeight: 755
    }
  },
  computed: {
    isEditMode() {
      return this.enableEditMode && this.editMode
    }
  },
  created() {
    if (this.enableRouterParser) {
      queryParser(this.listQuery, this.$route.query)
    }
  },
  methods: {
    listIndex(index) {
      return (this.page.currentPage - 1) * this.page.perPage + index + 1
    },
    getList() {
    },
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
        }
      })
      if (refresh) {
        this.getList()
      }
    },
    beforeGetList() {
      this.isLoading = true
      if (this.replaceUrl) {
        this.$router.replace({ path: this.$route.path, query: this.listQuery })
      }
    },
    setCurrentRow(row) {
      this.currentRow = row
    },
    toggleChangeMode() {
      this.editMode = !this.editMode
      this.$notify({ message: this.editMode ? `编辑模式已打开` : '编辑模式已关闭', duration: 1500, type: 'success' })
      if (this.editMode) {
        window.addEventListener('beforeunload', beforeUnload)
      } else {
        window.removeEventListener('beforeunload', beforeUnload)
      }

      this.$emit(EMIT_EDIT_MODE_CHANGED, this.editMode)
    },
    saveModification() {
      this.editForm.items.forEach((item, index) => {
        Object.assign(this.list[index], item)
        this.$set(this.list, index, this.list[index])
      })
    },
    backupOrConfirm(theForm) {
      if (this.editMode) {
        theForm.validate((valid) => {
          if (valid) {
            if (this.enableConfirm) {
              this.$confirm(this.confirmMessage, '提示', {
                confirmButtonText: '保存',
                cancelButtonText: '取消',
                showClose: false,
                closeOnClickModal: false,
                type: 'warning' })
                .then(() => {
                  this.saveModification()
                  this.toggleChangeMode()
                  this.$emit(EMIT_ON_FORM_SAVED, this.editForm.items)
                }).catch(() => {
                  this.editForm = JSON.parse(JSON.stringify(this.clonedForm))
                  this.toggleChangeMode()
                })
            } else {
              this.saveModification()
              this.toggleChangeMode()
              this.$emit(EMIT_ON_FORM_SAVED, this.editForm.items)
            }
          } else {
            return false
          }
        })
      } else {
        this.clonedForm = JSON.parse(JSON.stringify(this.editForm))
        this.toggleChangeMode()
      }
    },
    toggleEditMode(theForm = null) {
      if (this.enableEditMode && this.list.length > 0) {
        this.backupOrConfirm(theForm)
      }
    },
    openLineitemTrace(lineItemId, currentRpCode = undefined, lineNumber = undefined) {
      this.$refs.lineItemTrace.openLineitemTrace(lineItemId, currentRpCode, lineNumber)
    }
  }
}

