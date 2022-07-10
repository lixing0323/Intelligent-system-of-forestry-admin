<template>
  <div v-loading="divLoading">
    <one-step :step.sync="step" :next-bt-loading="nextBtLoading" :save-bt-loading="saveBtLoading" @next="clickNextBt()" @save="clickSaveBt()">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" label-position="right">
        <div class="form">
          <div>
            <el-form-item label="县、局、保护区：" prop="protection_zone" class="item">
              <el-input v-model="form.protection_zone" placeholder="请填写县、局、保护区" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="样地号：" prop="land_number" class="item">
              <el-input v-model="form.land_number" placeholder="请填写样地号" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="样地类别：" prop="plot_type" class="item">
              <el-select v-model="form.plot_type" class="select" filterable placeholder="请选择样地类别">
                <el-option v-for="(item, index) in plotTypeOptions" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="碳库类型：" prop="carbon_type" class="item">
              <el-select v-model="form.carbon_type" class="select" filterable placeholder="请选择碳库类型">
                <el-option v-for="(item, index) in carbonTypeOptions" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="GPS坐标：" prop="gps_y" class="item">
              <el-input v-model="form.gps_y" placeholder="纵坐标" class="gps" @input="form.gps_y=form.gps_y.replace(/[^\d\.]/g,'')" />
              <el-input v-model="form.gps_x" placeholder="横坐标" class="gps" @input="form.gps_x=form.gps_x.replace(/[^\d\.]/g,'')" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="土地权属：" prop="forest_property" class="item">
              <el-input v-model="form.forest_property" placeholder="请填写土地权属" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="调查日期：" prop="record_date" class="item">
              <el-date-picker v-model="form.record_date" type="date" :clearable="false" placement="bottom-start" placeholder="请选择调查日期" value-format="yyyy-MM-dd" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="调查人姓名：" prop="recorder_name" class="item">
              <el-input v-model="form.recorder_name" placeholder="请填写调查人姓名" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="调查人联系电话：" prop="recorder_mobile" class="item">
              <el-input v-model="form.recorder_mobile" placeholder="请填写调查人联系电话" maxlength="11" show-word-limit class="input" />
            </el-form-item>
          </div>
        </div>

        <div>
          <el-form-item label="备注：" prop="plot">
            <el-input v-model="form.comment" placeholder="请填写备注" class="area-text" type="textarea" :rows="4" />
          </el-form-item>
        </div>
      </el-form>
    </one-step>
  </div>
</template>

<script>
// 第一步：基本信息
import OneStep from './components/step'
import { CARBON_TYPE_OPTIONS, PLOT_TYPE_OPTIONS, dataCopyToForm, getJsonData } from './var.js'
import { createPlotSurvey, getPlotSurveyItem, updatePlotSurveyItem } from '@/api/dashboard/plotSurvey.js'
import { isValidCellPhone } from '@/utils/validate'
import { parseTime } from '@/utils'

export default {
  name: 'DataManagementBase',
  components: {
    OneStep
  },
  props: {
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!isValidCellPhone(value)) {
        callback(new Error('手机号码格式错误'))
      } else {
        callback()
      }
    }
    return {
      step: 0,
      id: undefined,
      divLoading: false,
      form: {
        protection_zone: '',
        land_number: '',
        plot_type: '',
        carbon_type: '',
        gps_x: '',
        gps_y: '',
        forest_property: '',
        record_date: '',
        recorder_name: '',
        recorder_mobile: '',
        comment: ''
      },
      rules: {
        protection_zone: [
          { required: true, message: '请填写县，市，保护区', trigger: 'blur' }
        ],
        plot_type: [
          { required: true, message: '请选择样地类别', trigger: 'change' }
        ],
        land_number: [
          { required: true, message: '请填写样地号', trigger: 'blur' }
        ],
        carbon_type: [
          { required: true, message: '请选择碳库类型', trigger: 'change' }
        ],
        forest_property: [
          { required: true, message: '请选择土地权属', trigger: 'blur' }
        ],
        record_date: [
          { required: true, message: '请选择调查日期', trigger: 'change' }
        ],
        recorder_name: [
          { required: true, message: '请填写调查人员姓名', trigger: 'blur' }
        ],
        recorder_mobile: [
          { required: true, message: '请填写调查人联系方式', trigger: 'blur' },
          { validator: validateMobile, trigger: ['blur'] }
        ]
      },
      plotTypeOptions: PLOT_TYPE_OPTIONS,
      carbonTypeOptions: CARBON_TYPE_OPTIONS,
      nextBtLoading: false,
      saveBtLoading: false,
      content: {}
    }
  },
  computed: {
    isEdit() {
      return Boolean(this.id)
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getItemData()
  },
  methods: {
    getItemData() {
      if (this.isEdit) {
        this.divLoading = true
        getPlotSurveyItem(this.id).then(res => {
          this.content = JSON.parse(res.content)
          dataCopyToForm(this.form, res)
          this.divLoading = false
        }).catch(() => (this.divLoading = false))
      } else {
        this.form.record_date = parseTime(Date.now(), '{y}-{m}-{d}')
      }
    },
    // 点击保存按钮
    clickSaveBt() {
      if (this.isEdit) {
        this.onSave()
      } else {
        this.onCreate()
      }
    },
    // 点击下一步
    clickNextBt() {
      if (this.isEdit) {
        this.onSave(true)
      } else {
        this.onCreate(true)
      }
    },
    // 保存
    onSave(next = false) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.saveBtLoading = true
          updatePlotSurveyItem(this.id, getJsonData(this.form, this.content)).then(res => {
            this.saveBtLoading = false

            if (next) {
              this.gotoNext(res)
            }
          }).catch(() => (this.saveBtLoading = false))
        }
      })
    },
    onCreate(next = false) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.nextBtLoading = true
          createPlotSurvey(getJsonData(this.form)).then(res => {
            this.nextBtLoading = false

            if (next) {
              this.gotoNext(res)
            } else {
              this.gotoEdit(res)
            }
          }).catch(() => (this.nextBtLoading = false))
        }
      })
    },
    // 从新建模式到编辑模式
    gotoEdit(row) {
      console.log('gotoEdit', row)
      this.$router.replace({ name: 'DataManagementBase', params: { id: row.id }})
    },
    // 下一步
    gotoNext(row) {
      console.log('gotoNext', row)
      this.$router.push({ name: 'DataManagementLand', params: { id: row.id }})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
