<template>
  <div ref="wrapper">
    <div :key="tableKey">
      <slot />
    </div>
  </div>
</template>

<script>
import sortable from 'sortablejs'
export default {
  name: 'HtTableDraggable',
  props: {
    handle: {
      type: String,
      default: ''
    },
    animate: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableKey: 0
    }
  },
  watch: {
    tableKey() {
      this.$nextTick(() => {
        this.makeTableSortAble()
        this.keepWrapperHeight(false)
      })
    }
  },
  mounted() {
    this.makeTableSortAble()
  },
  methods: {
    makeTableSortAble() {
      const table = this.$children[0].$el.querySelector(
        '.el-table__body-wrapper tbody'
      )
      sortable.create(table, {
        handle: this.handle,
        animation: this.animate,
        disabled: this.disabled,
        onEnd: ({ newIndex, oldIndex }) => {
          this.keepWrapperHeight(true)
          this.tableKey = Math.random()
          const arr = this.$children[0].data
          const targetRow = arr.splice(oldIndex, 1)[0]
          arr.splice(newIndex, 0, targetRow)
          this.$emit('drop', { targetObject: targetRow, list: arr })
          if (newIndex !== oldIndex) {
            this.$emit('end')
          }
        }
      })
    },
    keepWrapperHeight(keep) {
      // eslint-disable-next-line prefer-destructuring
      const wrapper = this.$refs.wrapper
      if (keep) {
        wrapper.style.minHeight = `${wrapper.clientHeight}px`
      } else {
        wrapper.style.minHeight = 'auto'
      }
    }
  }
}
</script>
