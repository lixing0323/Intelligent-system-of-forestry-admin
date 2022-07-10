<template>
  <el-card>
    <ht-action-panel>
      <template slot="left">
        <el-input v-model="listQuery.protection_zone" placeholder="县、局、保护区" class="filter-item" @keyup.enter.native="onSearch" />
        <el-input v-model="listQuery.land_number" placeholder="样地号" class="filter-item" @keyup.enter.native="onSearch" />
        <el-input v-model="listQuery.forest_property" placeholder="土地权属" class="filter-item" @keyup.enter.native="onSearch" />
        <el-date-picker v-model="listQuery.record_date" type="date" :clearable="false" placement="bottom-start" placeholder="请选择调查日期" value-format="yyyy-MM-dd" />
        <el-input v-model="listQuery.recorder_name" placeholder="调查人姓名" class="filter-item" @keyup.enter.native="onSearch" />
        <el-input v-model="listQuery.recorder_mobile" placeholder="调查人联系电话" class="filter-item" @keyup.enter.native="onSearch" />
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="default" icon="el-icon-delete" @click="onClear">重置</el-button>
      </template>
      <template slot="right">
        <el-button type="primary" icon="el-icon-circle-plus" @click="onCreate()">新建样地</el-button>
      </template>
    </ht-action-panel>
    <ht-table ref="table" v-loading="isLoading" :data="list" row-key="id">
      <ht-table-column type="index" width="55" label="序号" />
      <ht-table-column label="县、局、保护区" prop="protection_zone" min-width="100" />
      <ht-table-column label="样地号" prop="land_number" min-width="100" />
      <ht-table-column label="土地权属" prop="forest_property" min-width="100" />
      <ht-table-column label="调查日期" prop="record_date" min-width="100" />
      <ht-table-column label="调查人姓名" prop="recorder_name" min-width="120" />
      <ht-table-column label="调查人联系电话" prop="recorder_mobile" min-width="120" />
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
        this.list = response
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
      this.$router.push({ name: 'DataManagementBase', params: { id: row.id }})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

