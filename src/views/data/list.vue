<template>
  <el-card>
    <ht-action-panel>
      <template slot="left">
        <el-input v-model="listQuery.content" placeholder="请输入内容" class="filter-item" @keyup.enter.native="onSearch" />
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="default" icon="el-icon-delete" @click="onClear">重置</el-button>
      </template>
      <template slot="right">
        <el-button type="primary" icon="el-icon-circle-plus" @click="onCreate()">新建样地</el-button>
      </template>
    </ht-action-panel>
    <ht-table ref="table" v-loading="isLoading" :data="list" row-key="id">
      <ht-table-column type="index" width="55" label="序号" :index="listIndex" />
      <ht-table-column label="领料单号" prop="code" min-width="100" />
      <ht-table-column label="领料单名称" min-width="120" prop="name" />\
      <ht-table-column label="领料单类型" min-width="90">
        <template slot-scope="{ row }">
          {{ row.pickingTyp }}
        </template>
      </ht-table-column>
      <ht-table-column label="操作" width="90">
        <template slot-scope="{ row }">
          <el-button type="text" class="primary" @click="onEdit(row)">编辑</el-button>
        </template>
      </ht-table-column>
    </ht-table>
    <ht-pagination
      v-show="page.total>0"
      ref="page"
      :total="page.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.perPage"
      :page-sizes="pageSizes"
      @pagination="getList()"
    />
  </el-card>
</template>

<script>
import listMixin from '@/views/mixins/listMixin'
import { getPlotSurveyList } from '@/api/dashboard/plotSurvey'

export default {
  components: { },
  mixins: [listMixin],
  props: {
  },
  data() {
    return {
      listQuery: {
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.beforeGetList()
      getPlotSurveyList(this.listQuery).then(response => {
        this.list = response.data
        this.page.total = Number(response.total_pages)
        this.isLoading = false
      }).catch(() => (this.isLoading = false))
    },
    // 新建
    onCreate() {
      this.$router.push({ name: 'DataManagementCreate' })
    },
    // 编辑
    onEdit(row) {
      // this.$router.push({ name: 'DataManagementEdit', params: { id: row.id }})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

