<template>
  <div v-loading="divLoading">
    <two-step
      :step.sync="step"
      :save-bt-loading="saveBtLoading"
      :next-bt-loading="nextBtLoading"
      @save="clickSaveBt()"
      @previous="gotoPrevious()"
      @next="clickNextBt()"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="right">
        <div class="form">
          <div>
            <el-form-item label="地貌：" prop="domain" class="item">
              <el-select v-model="form.land_forms" class="select" filterable placeholder="请选择地貌">
                <el-option v-for="(item, index) in landFormsOptions" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="海拔：" prop="altitude" class="item">
              <el-input v-model="form.altitude" placeholder="请填写海拔" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="坡向：" prop="slope_direction" class="item">
              <el-select v-model="form.slope_direction" class="select" filterable placeholder="请选择坡向">
                <el-option v-for="(item, index) in slopeDirectionOptions" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="坡位：" prop="slope_position" class="item">
              <el-select v-model="form.slope_position" class="select" filterable placeholder="请选择坡位">
                <el-option v-for="(item, index) in slopePositionOptions" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="坡度：" prop="slope_degrees" class="item">
              <el-select v-model="form.slope_degrees" class="select" filterable placeholder="请选择坡度">
                <el-option v-for="(item, index) in slopeDegreesOptions" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土壤名称：" prop="soil_name" class="item">
              <el-input v-model="form.soil_name" placeholder="请填写土壤名称" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土壤厚度：" prop="soil_thickness" class="item">
              <el-select v-model="form.soil_thickness" class="select" filterable placeholder="请选择土壤厚度">
                <el-option v-for="(item, index) in soilThicknessOptions" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="腐殖层厚度：" prop="currents_layer_thickness" class="item">
              <el-select v-model="form.currents_layer_thickness" class="select" filterable placeholder="请选择腐殖层厚度">
                <el-option v-for="(item, index) in currentsLayerThicknessOptions" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="地类：" prop="ground_type" class="item">
              <el-input v-model="form.ground_type" placeholder="请填写地类" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="沙化类型：" prop="desertification_type" class="item">
              <el-input v-model="form.desertification_type" placeholder="请填写沙化类型" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="沙化程度：" prop="desertification_degree" class="item">
              <el-input v-model="form.desertification_degree" placeholder="请填写沙化程度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="荒漠化程度：" prop="wilderness_degree" class="item">
              <el-input v-model="form.wilderness_degree" placeholder="请填写荒漠化程度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="沟蚀崩塌面积比：" prop="gully_erosion_collapse_area_ratio" class="item">
              <el-input v-model="form.gully_erosion_collapse_area_ratio" placeholder="请填写沟蚀崩塌面积比" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土壤水蚀等级：" prop="soil_water_erosion_grade" class="item">
              <el-input v-model="form.soil_water_erosion_grade" placeholder="请填写土壤水蚀等级" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土壤风蚀等级：" prop="soil_wind_erosion_grade" class="item">
              <el-input v-model="form.soil_wind_erosion_grade" placeholder="请填写土壤风蚀等级" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="CO²浓度：" prop="carbon_dioxide_concentration" class="item">
              <el-input v-model="form.carbon_dioxide_concentration" placeholder="请填写CO²浓度" class="input" />
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
import {
  LANDFORMS_OPTIONS, SLOPE_DIRECTION_OPTIONS, SLOPE_POSITION_OPTIONS,
  SLOPE_DEGREES_OPTIONS, SOIL_THICKNESS_OPTIONS, CURRENTS_LAYER_THICKNESS_OPTIONS, dataCopyToForm, getJsonData
} from './var.js'
import { getPlotSurveyItem, updatePlotSurveyItem } from '@/api/dashboard/plotSurvey'

export default {
  name: 'DataManagementLand',

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
        land_forms: '',
        altitude: '',
        slope_direction: '',
        slope_position: '',
        slope_degrees: '',
        soil_name: '',
        soil_thickness: '',
        currents_layer_thickness: '',
        ground_type: '',
        desertification_type: '',
        desertification_degree: '',
        wilderness_degree: '',
        gully_erosion_collapse_area_ratio: '',
        soil_water_erosion_grade: '',
        soil_wind_erosion_grade: '',
        carbon_dioxide_concentration: ''
      },
      rules: {
      },
      landFormsOptions: LANDFORMS_OPTIONS,
      slopeDirectionOptions: SLOPE_DIRECTION_OPTIONS,
      slopePositionOptions: SLOPE_POSITION_OPTIONS,
      slopeDegreesOptions: SLOPE_DEGREES_OPTIONS,
      soilThicknessOptions: SOIL_THICKNESS_OPTIONS,
      currentsLayerThicknessOptions: CURRENTS_LAYER_THICKNESS_OPTIONS,
      base: {},
      content: {},
      divLoading: false,
      nextBtLoading: false,
      saveBtLoading: false
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
    // 点击保存按钮
    clickSaveBt() {
      this.onSave()
    },
    // 点击下一步
    clickNextBt() {
      this.onSave(true)
    },
    // 保存
    onSave(next = false) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.setLoadingBt(next, true)
          Object.assign(this.content, this.form)
          updatePlotSurveyItem(this.id, getJsonData(this.base, this.content)).then(res => {
            this.setLoadingBt(next, false)

            if (next) {
              this.gotoNext(res)
            }
          }).catch(() => (this.setLoadingBt(next, false)))
        }
      })
    },
    setLoadingBt(next, bl) {
      if (next) {
        this.nextBtLoading = bl
      } else {
        this.saveBtLoading = bl
      }
    },
    // 上一步
    gotoPrevious() {
      this.$router.push({ name: 'DataManagementBase', params: { id: this.id }})
    },
    // 下一步
    gotoNext() {
      this.$router.push({ name: 'DataManagementType', params: { id: this.id }})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
