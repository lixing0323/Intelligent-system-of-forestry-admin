<script>

export default {
  name: 'HtFormContainer',
  props: {
    labelWidth: {
      type: String,
      default: '115px'
    },
    itemId: {
      type: [String, Number],
      default: undefined
    },
    createFunc: {
      type: Function,
      default: null
    },
    updateFunc: {
      type: Function,
      default: null
    },
    businessName: {
      type: String,
      default: '业务名称'
    }
  },
  data() {
    return {
      data: null,
      form: {},
      formInit: {},
      rules: {},
      isLoading: false,
      width: {
        mini: 'width: 400px;',
        default: 'width: 600px;',
        large: 'width: 800px;',
        unLimit: 'width: 100%'
      },
      context: null
    }
  },
  mounted() {
    Object.assign(this.formInit, this.form)
  },
  methods: {
    onCancel() {
      this.$emit('on-cancel')
    },
    onCreate() {
      if (this.createFunc) {
        this.createFunc(this.form)
          .then(resp => {
            this.onCreated(resp, this.businessName)
          }).catch(() => {
            this.afterSubmit()
          })
      }
    },
    onCreated(resp, bizName = '业务名称') {
      this.afterSubmit(`新增${bizName}成功！`, true)
      this.$emit('on-created', resp, this.context)
    },
    onUpdate() {
      if (this.updateFunc) {
        this.updateFunc(this.itemId, this.form)
          .then(resp => {
            this.onUpdated(resp, this.businessName)
          })
          .catch(() => {
            this.afterSubmit()
          })
      }
    },
    onUpdated(resp, bizName = '业务名称') {
      this.afterSubmit(`修改${bizName}成功！`, true)
      this.$emit('on-updated', resp, this.context)
    },
    beforeSubmit() {
      this.isLoading = true
    },
    afterSubmit(msg = '', success = false) {
      if (success) {
        this.$message.success({ message: msg, duration: 1500 })
      }
      this.isLoading = false
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.beforeSubmit()
          if (this.data) {
            this.onUpdate()
          } else {
            this.onCreate()
          }
        } else {
          return false
        }
      })
    },
    _initForm(data = null, context = null) {
      this.data = data
      this.context = context
      data = this.data || this.formInit
      Object.keys(this.form).forEach(key => (this.form[key] = data[key]))
      this.isLoading = false
    },
    initForm(data = null, context = null) {
      this._initForm(data, context)
    }
  }
}
</script>
