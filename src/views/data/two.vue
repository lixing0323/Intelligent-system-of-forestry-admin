<template>
  <div>
    <two-step :step.sync="step" @previous="gotoPrevious()" @next="gotoNext()">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="right">
        <div class="form">
          <div>
            <el-form-item label="地貌：" prop="domain" class="item">
              <el-select v-model="form.domain" class="select" filterable placeholder="请选择地貌">
                <el-option v-for="(item, index) in domainOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="海拔：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写海拔" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="坡向：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择坡向">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="坡位：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择坡位">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="坡度：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择坡度">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土壤名称：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写土壤名称" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土壤厚度：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择土壤厚度">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="腐殖层厚度：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择腐殖层厚度">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="地类：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择地类">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="沙化类型：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择沙化类型">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="沙化程度：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择沙化程度">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="荒漠化程度：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择荒漠化程度">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="沟蚀崩塌面积比：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择沟蚀崩塌面积比">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土壤水蚀等级：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择土壤水蚀等级">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土壤风蚀等级：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择土壤风蚀等级">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="CO²浓度：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写CO²浓度" class="input" />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </two-step>
  </div>
</template>

<script>
// 第二步：地貌/土壤信息
import TwoStep from './components/step'

export default {
  components: {
    TwoStep
  },
  props: {
  },
  data() {
    return {
      step: 1,
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
    // 上一步
    gotoPrevious() {
      this.$router.push({ name: 'DataManagementOne', params: { id: this.id }})
    },
    // 下一步
    gotoNext() {
      this.$router.push({ name: 'DataManagementThree', params: { id: this.id }})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
