<template>
  <div v-loading="divLoading">
    <three-step
      :step.sync="step"
      :save-bt-loading="saveBtLoading"
      :submit-bt-loading="submitBtLoading"
      @save="clickSaveBt()"
      @previous="gotoPrevious()"
      @submit="clickSubmitBt()"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="right">
        <div class="form">
          <div>
            <el-form-item label="枯枝落叶厚度：" prop="litter_thickness" class="item">
              <el-input v-model="form.litter_thickness" placeholder="请填写枯枝落叶厚度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="灌木覆盖度：" prop="shrub_coverage" class="item">
              <el-input v-model="form.shrub_coverage" placeholder="请填写灌木覆盖度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="灌木高度：" prop="shrub_height" class="item">
              <el-input v-model="form.shrub_height" placeholder="请填写灌木高度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="草本覆盖度：" prop="herbaceous_coverage" class="item">
              <el-input v-model="form.herbaceous_coverage" placeholder="请填写草本覆盖度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="草本高度：" prop="herbaceous_height" class="item">
              <el-input v-model="form.herbaceous_height" placeholder="请填写草本高度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="植被总覆盖度：" prop="total_vegetation_coverage" class="item">
              <el-input v-model="form.total_vegetation_coverage" placeholder="请填写植被总覆盖度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="植被类型：" prop="vegetation_type" class="item">
              <el-input v-model="form.vegetation_type" placeholder="请填写植被类型" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="林木权属：" prop="forest_ownership" class="item">
              <el-input v-model="form.forest_ownership" placeholder="请填写林木权属" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="林种：" prop="forest_species" class="item">
              <el-input v-model="form.forest_species" placeholder="请填写林种" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="起源：" prop="origin" class="item">
              <el-input v-model="form.origin" placeholder="请填写起源" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="优势树种：" prop="dominant_tree_species" class="item">
              <el-input v-model="form.dominant_tree_species" placeholder="请填写优势树种" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="平均年龄：" prop="average_age" class="item">
              <el-input v-model="form.average_age" placeholder="请填写平均年龄" class="input" @input="form.average_age=form.average_age.replace(/[^\d\.]/g,'')" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="龄组：" prop="age_group" class="item">
              <el-input v-model="form.age_group" placeholder="请填写龄组" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="径组：" prop="diameter_group" class="item">
              <el-input v-model="form.diameter_group" placeholder="请填写径组" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="平均胸径：" prop="average_DBH" class="item">
              <el-input v-model="form.average_DBH" placeholder="请填写平均胸径" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="平均树高：" prop="average_tree_height" class="item">
              <el-input v-model="form.average_tree_height" placeholder="请填写平均树高" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="郁闭度：" prop="canopy_closure" class="item">
              <el-input v-model="form.canopy_closure" placeholder="请填写郁闭度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="森林群落结构：" prop="forest_community_structure" class="item">
              <el-input v-model="form.forest_community_structure" placeholder="请填写森林群落结构" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="林层结构：" prop="forest_layer_structure" class="item">
              <el-input v-model="form.forest_layer_structure" placeholder="请填写林层结构" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="树种结构：" prop="tree_species_structure" class="item">
              <el-input v-model="form.tree_species_structure" placeholder="请填写树种结构" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="毛竹林分株数：" prop="phyllostachys_pubescens_stands_count" class="item">
              <el-input v-model="form.phyllostachys_pubescens_stands_count" placeholder="请填写毛竹林分株数" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="毛竹散生株数：" prop="scattered_phyllostachys_pubescens_count" class="item">
              <el-input v-model="form.scattered_phyllostachys_pubescens_count" placeholder="请填写毛竹散生株数" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="天然更新等级：" prop="natural_renewal_grade" class="item">
              <el-input v-model="form.natural_renewal_grade" placeholder="请填写天然更新等级" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="样木总株数：" prop="total_sample_trees" class="item">
              <el-input v-model="form.total_sample_trees" placeholder="请填写样木总株数" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="活立木总蓄积：" prop="total_standing_stock" class="item">
              <el-input v-model="form.total_standing_stock" placeholder="请填写活立木总蓄积" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="林木蓄积：" prop="forest_stock" class="item">
              <el-input v-model="form.forest_stock" placeholder="请填写林木蓄积" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="造林地情况：" prop="afforestation_land_conditions" class="item">
              <el-input v-model="form.afforestation_land_conditions" placeholder="请填写造林地情况" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="作业方式：" prop="operation_mode" class="item">
              <el-input v-model="form.operation_mode" placeholder="请填写作业方式" class="input" />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </three-step>
  </div>
</template>

<script>
// 第三步：类别详情
import ThreeStep from './components/step'
import { getPlotSurveyItem, updatePlotSurveyItem } from '@/api/dashboard/plotSurvey'
import { dataCopyToForm, getJsonData } from '@/views/data/var'

export default {
  name: 'DataManagementType',
  components: {
    ThreeStep
  },
  props: {
  },
  data() {
    return {
      step: 2,
      id: undefined,
      form: {
        litterThickness: '',
        shrub_coverage: '',
        shrub_height: '',
        herbaceous_coverage: '',
        herbaceous_height: '',
        total_vegetation_coverage: '',
        vegetation_type: '',
        forest_ownership: '',
        forest_species: '',
        origin: '',
        dominant_tree_species: '',
        average_age: '',
        age_group: '',
        diameter_group: '',
        average_DBH: '',
        average_tree_height: '',
        canopy_closure: '',
        forest_community_structure: '',
        forest_layer_structure: '',
        tree_species_structure: '',
        phyllostachys_pubescens_stands_count: '',
        scattered_phyllostachys_pubescens_count: '',
        natural_renewal_grade: '',
        total_sample_trees: '',
        total_standing_stock: '',
        forest_stock: '',
        afforestation_land_conditions: '',
        operation_mode: ''
      },
      rules: {
      },
      divLoading: false,
      submitBtLoading: false,
      saveBtLoading: false,
      base: {},
      content: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getItemData()
  },
  methods: {
    getItemData() {
      this.divLoading = true
      getPlotSurveyItem(this.id).then(res => {
        this.base = res
        this.content = JSON.parse(res.content)
        dataCopyToForm(this.form, res)
        this.divLoading = false
      }).catch(() => (this.divLoading = false))
    },
    // 上一步
    gotoPrevious() {
      this.$router.push({ name: 'DataManagementLand', params: { id: this.id }})
    },
    // 点击保存按钮
    clickSaveBt() {
      this.onSave()
    },
    // 保存
    onSave(submit = false) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          Object.assign(this.content, this.form)
          this.setLoadingBt(submit, true)
          updatePlotSurveyItem(this.id, getJsonData(this.base, this.content)).then(res => {
            this.setLoadingBt(submit, false)

            if (submit) {
              this.gotoList()
            }
          }).catch(() => (this.setLoadingBt(submit, false)))
        }
      })
    },
    clickSubmitBt() {
      this.onSave(true)
    },
    setLoadingBt(submit, bl) {
      if (submit) {
        this.submitBtLoading = bl
      } else {
        this.saveBtLoading = bl
      }
    },
    // 跳回列表
    gotoList() {
      this.$router.replace({ name: 'DataManagementList', params: { id: this.id }})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
