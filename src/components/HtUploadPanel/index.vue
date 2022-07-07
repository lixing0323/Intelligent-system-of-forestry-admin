<template>
  <div>
    <ht-action-panel>
      <template slot="left">
        <ht-upload-button
          v-if="isEdit"
          file-type="all"
          button-type="primary"
          :multiple-selection="multipleFiles"
          :key-prefix="uploadKeyPrefix"
          :button-title="uploadBtnTitle"
          @on-upload-start="onUploadStart"
          @on-file-uploaded="onFileUploaded"
          @on-files-uploaded="onFilesUploaded"
          @on-upload-progress="onUploadProgress"
        />
        <span v-if="percent!==0">{{ percent }}%</span>
        <ht-download-link v-if="templateFile" :link-url="templateFile.url" :link-title="templateFile.name" />
      </template>
      <template v-if="!simpleMode" slot="right">
        <ht-help-tag v-show="list.length>0" tooltip="浅绿色背景是本次上传的附件" />
        <el-button v-show="list.length>0" :disabled="isLoading||updating" type="success" size="mini" icon="el-icon-refresh" @click="onUpdateAttachments">{{ updateBtnTitle }}</el-button>
        <el-button v-if="showCancelBtn" type="default" size="mini" @click="onCancel">取消</el-button>
      </template>
    </ht-action-panel>
    <ht-table v-if="listShowModel" ref="table" v-loading="isLoading" :data="list" :row-class-name="tableRowClassName" :stripe="false">
      <ht-table-column v-if="multipleFiles" label="序号" type="index" align="center" width="55" />
      <ht-table-column label="文件名称" prop="filename" min-width="130" />
      <ht-table-column label="附件链接" width="130">
        <template slot-scope="{row}">
          <ht-download-link :link-url="row.url" link-title="下载" />
        </template>
      </ht-table-column>
      <ht-table-column label="单位" min-width="140" prop="orgName" />
      <ht-table-column label="上传用户" prop="creatorCode" min-width="80" />
      <ht-table-column label="上传用户姓名" prop="creatorName" min-width="45" />
      <ht-table-column label="上传日期" min-width="100" align="center">
        <template slot-scope="{row}">
          {{ row.createdAt }}
        </template>
      </ht-table-column>
      <ht-table-column v-if="!simpleMode" label="状态" width="80">
        <template slot-scope="{row}">
          <el-tag v-if="!row.deleted" type="success">正常</el-tag>
          <el-tag v-else type="danger">待删除</el-tag>
        </template>
      </ht-table-column>
      <ht-table-column-operation v-if="isEdit" width="60">
        <template slot-scope="scope">
          <template v-if="!scope.row.deleted">
            <ht-popover-button v-show="userId === scope.row.uploaderId" confirm-title="是否删除该附件?" :danger-text="true" @confirmed="toggleItemStatus(scope.$index)">移除</ht-popover-button>
          </template>
          <template v-else>
            <el-button v-show="userId === scope.row.uploaderId" type="default" size="mini" @click="toggleItemStatus(scope.$index)">恢复</el-button>
          </template>
        </template>
      </ht-table-column-operation>
    </ht-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { originFilenameOfUrl } from '@/filters'

export default {
  name: 'HtUploadPanel',
  components: { },
  props: {
    showCancelBtn: {
      type: Boolean,
      default: false
    },
    templateFile: {
      type: Object,
      default: undefined
    },
    multipleFiles: {
      type: Boolean,
      default: true
    },
    updateBtnTitle: {
      type: String,
      default: '更新附件'
    },
    uploadBtnTitle: {
      type: String,
      default: '上传附件'
    },
    simpleMode: {
      type: Boolean,
      default: true
    },
    listShowModel: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    uploadKeyPrefix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      context: null,
      isLoginUser: false,
      attachment: {
        filename: null,
        url: null,
        createdAt: null,
        uploaderId: null,
        creatorName: null,
        creatorCode: null,
        orgCode: null,
        orgName: null,
        deleted: false
      },
      percent: 0,
      updating: false,
      userId: null,
      isLoading: false,
      list: []
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'businesses'])
  },
  watch: {
    list(val) {
      this.$emit('get-upload-succeed-List', val)
    }
  },
  created() {
    this.userId = this.userInfo.userId
  },
  methods: {
    initUploadPane(context, attachments, uploadKeyPrefix = 'temp/prefix') {
      this.list = []
      this.updating = false
      this.context = context
      this.uploadKeyPrefix = uploadKeyPrefix
      attachments.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return 1
        } else if (a.createdAt < b.createdAt) {
          return -1
        } else {
          return 0
        }
      })
      attachments.reverse()
      attachments.forEach(item => {
        const newItem = JSON.parse(JSON.stringify(item))
        newItem.deleted = false
        newItem.new = false
        this.list.push(newItem)
      })
    },
    makeAttachment(url) {
      return {
        filename: originFilenameOfUrl(url),
        url: url,
        createdAt: this.$moment().format('YYYY-MM-DD HH:mm:SS'),
        uploaderId: this.userInfo.userId,
        creatorCode: this.userInfo.username || '',
        creatorName: this.userInfo.fullname,
        orgCode: this.businesses.org.orgCode,
        orgName: this.businesses.org.orgName,
        deleted: false,
        new: true
      }
    },
    onUploadStart() {
      this.isLoading = true
    },
    onUploadProgress(percent) {
      this.percent = percent
    },
    onFileUploaded(context, url) {
      this.list = [this.makeAttachment(url)]
      this.isLoading = false
    },
    onFilesUploaded(context, urls) {
      urls.forEach(url => {
        this.list.splice(0, 0, this.makeAttachment(url))
      })
      this.isLoading = false
    },
    toggleItemStatus(index) {
      if (this.simpleMode) {
        this.list.splice(index, 1)
      } else {
        const item = this.list[index]
        item.deleted = !item.deleted
        this.$set(this.list, index, item)
      }
    },
    onUpdateAttachments() {
      this.updating = true
      const newList = JSON.parse(JSON.stringify(this.list.filter(item => item.deleted === false)))
      newList.forEach(item => {
        delete item.deleted
        delete item.new
      })
      this.$emit('on-update-attachments', this.context, newList)
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.new) {
        return 'new-added-row'
      } else {
        return ''
      }
    },
    onCancel() {
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-table .new-added-row {
    background: #f0f9eb;
  }
</style>
