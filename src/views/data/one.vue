<template>
  <div>
    <one-step :step.sync="step" @next="gotoNext()">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="right">
        <div class="form">
          <div>
            <el-form-item label="县、局、保护区：" prop="domain" class="item">
              <el-select v-model="form.domain" class="select" filterable placeholder="请选择县、局、保护区">
                <el-option v-for="(item, index) in domainOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="样地号：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写样地号" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="样地类别：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择样地类别">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="碳库类型：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择碳库类型">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="GPS坐标：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="纵坐标" class="gps" />
              <el-input v-model="form.plot" placeholder="横坐标" class="gps" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土地权属：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写土地权属" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="调查日期：" prop="plot" class="item">
              <el-date-picker v-model="form.a" type="date" :clearable="false" placement="bottom-start" placeholder="请选择调查日期" value-format="yyyy-MM-dd" />
            </el-form-item>
          </div>
        </div>

        <div>
          <el-form-item label="备注：" prop="plot">
            <el-input v-model="form.plot" placeholder="请填写备注" class="area-text" type="textarea" :rows="4" />
          </el-form-item>
        </div>
      </el-form>
    </one-step>
  </div>
</template>

<script>
// 第一步：基本信息
import OneStep from './components/step'

export default {
  components: {
    OneStep
  },
  props: {
  },
  data() {
    return {
      step: 0,
      id: undefined,
      form: {
        domain: '',
        plot: ''
      },
      rules: {
      },
      domainOptions: [],
      plotOptions: []
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  methods: {
    // 下一步
    gotoNext() {
      this.$router.push({ name: 'DataManagementTwo', params: { id: this.id }})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
