<template>
  <ht-dialog :visible="dialogVisible" :width="DIALOG_WIDTH.default" @close="dialogVisible=false">
    <ht-action-panel>
      <template slot="left">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </template>
      <template slot="right">
        <ht-popover-button
          type="text"
          icon="el-icon-refresh"
          confirm-title="请确认是恢复至本次加载时数据？"
          @confirmed="onRecoverRecordToStart()"
        >恢复至本次加载
        </ht-popover-button>
      </template>
      <template slot="right">
        <ht-popover-button
          type="text"
          icon="el-icon-delete"
          confirm-title="请确认是否清空历史修改记录？"
          @confirmed="apiClearRecords()"
        >清空
        </ht-popover-button>
      </template>
    </ht-action-panel>
    <ht-table :data="records">
      <ht-table-column-index />
      <ht-table-column label="时间" width="165">
        <template v-slot="{row}">
          <span :class="_timeStyle(row)">{{ row.time }}</span>
        </template>
      </ht-table-column>
      <ht-table-column v-if="userInfo" label="操作人" width="75">
        <template v-slot="{row}">
          <div :class="_timeStyle(row)">
            <slot name="user-info" :user-info="row.user">
              <span>{{ row.user.fullname }}</span>
            </slot>
          </div>
        </template>
      </ht-table-column>
      <ht-table-column label="操作摘要">
        <template v-slot="{row}">
          <span :class="_timeStyle(row)">
            {{ row.digest }}
          </span>
        </template>
      </ht-table-column>
      <ht-table-column-operation label="操作" width="100">
        <template v-slot="{$index}">
          <ht-popover-button
            type="text"
            :danger-text="true"
            :context="$index"
            confirm-title="请确认要否删除记录?"
            @confirmed="apiRemoveRecord"
          >删除
          </ht-popover-button>
          <ht-popover-button
            type="text"
            :context="$index"
            confirm-title="该操作将覆盖当前修改！"
            @confirmed="onRecoverRecord"
          >恢复
          </ht-popover-button>
        </template>
      </ht-table-column-operation>
    </ht-table>
    <ht-dialog v-if="implementCompare" ref="comparePane" :visible="comparePane.visible" />
  </ht-dialog>
</template>

<script>
import moment from 'moment'
import { DIALOG_WIDTH } from '@/views/components/vars'
const BASE_KEY = 'HtHistoryRecorder-'
const TIME_FORMAT = 'YYYY年MM月DD日 HH:mm:ss'
export default {
  name: 'HtHistoryRecorder',
  props: {
    title: { type: String, default: '历史修改记录' },
    getCurrentRecord: { type: Function, required: true },
    currentRecord: { type: [Object, Array, String, Number, Boolean], default: null },
    recordKey: { type: String, default: null },
    saveLocalStorage: { type: Boolean, default: true },
    needLoad: { type: Boolean, default: true },
    autoSave: { type: Boolean, default: false },
    autoSaveInterval: { type: Number, default: 300 },
    implementCompare: { type: Boolean, default: false },
    userInfo: { type: Object, default: null },
    historyCount: { type: Number, default: 20 }
  },
  data() {
    return {
      DIALOG_WIDTH,
      dialogVisible: false,
      comparePane: {
        visible: false,
        leftRecord: null,
        rightRecord: null
      },
      records: [],
      originalRecord: null,
      componentCreatedAt: null
    }
  },
  computed: {
    bizKey() {
      if (this.recordKey) {
        return BASE_KEY + this.recordKey
      } else {
        return BASE_KEY
      }
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.componentCreatedAt = moment().format(TIME_FORMAT)
      this.originalRecord = JSON.parse(JSON.stringify(this.currentRecord))
      this._recoverRecords()
      this._setupAutoSave()
    },
    _timeStyle(record) {
      if (record.time > this.componentCreatedAt) {
        return 'time-success'
      } else {
        return 'time-info'
      }
    },
    _setupAutoSave() {
      if (this.autoSave) {
        setInterval(() => {
          if (this.getCurrentRecord) {
            const record = this._createRecord(this.getCurrentRecord(), '自动保存')
            this.records.unshift(record)
          }
          this.apiSaveRecords()
        }, this.autoSaveInterval * 1000)
      }
    },
    _createRecord(obj, digest = '') {
      return {
        time: moment().format(TIME_FORMAT),
        user: this.userInfo,
        digest: digest,
        record: obj
      }
    },
    _setLocalStorage() {
      const key = this.bizKey
      if (key === BASE_KEY) {
        console.log('The [recordKey] not initialized, failed to save records')
      } else {
        localStorage.setItem(key, JSON.stringify(this.records))
      }
    },
    _getLocalStorage() {
      const key = this.bizKey
      if (key === BASE_KEY) {
        console.log('The [recordKey] not initialized, failed to recover records')
      } else {
        this.records = JSON.parse(localStorage.getItem(key)) || []
      }
    },
    _recoverRecords() {
      if (this.needLoad) {
        this._getLocalStorage()
      }
    },
    apiAddNewRecord(obj, digest = '') {
      const record = this._createRecord(obj, digest)
      this.records.unshift(record)
      if (this.records.length >= this.historyCount) {
        this.records.splice(this.historyCount)
      }
      this.apiSaveRecords()
    },
    apiRemoveRecord(index) {
      this.records.splice(index, 1)
      this.apiSaveRecords()
    },
    apiClearRecords() {
      this.records = []
      if (this.saveLocalStorage) {
        const key = this.bizKey
        if (key === BASE_KEY) {
          console.log('The [recordKey] not initialized, failed to clear records')
        } else {
          localStorage.removeItem(key)
        }
      }
    },
    apiSaveRecords() {
      if (this.saveLocalStorage) {
        this._setLocalStorage()
      }
    },
    openHistoryPane() {
      this.dialogVisible = true
    },
    onRecoverRecord(index) {
      const record = JSON.parse(JSON.stringify(this.records[index].record))
      this.$emit('on-recover-record', record)
    },
    onRecoverRecordToStart() {
      const record = JSON.parse(JSON.stringify(this.originalRecord))
      this.$emit('on-recover-record', record)
    }
  }
}
</script>

<style scoped>
  .time-success {
    color: #1DC763
  }
  .time-info {
    color: #92959A
  }
</style>
