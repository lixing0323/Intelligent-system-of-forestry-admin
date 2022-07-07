<template>
  <div>
    <three-step :step.sync="step" @previous="gotoPrevious()">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="right">
        <div class="form">
          <div>
            <el-form-item label="枯枝落叶厚度：" prop="domain" class="item">
              <el-input v-model="form.plot" placeholder="请填写枯枝落叶厚度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="灌木覆盖度：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写灌木覆盖度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="灌木高度：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写灌木高度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="草本覆盖度：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写草本覆盖度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="草本高度：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写草本高度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="植被总覆盖度：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写植被总覆盖度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="植被类型：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择植被类型">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="林木权属：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择林木权属">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="林种：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择林种">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="起源：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择起源">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="优势树种：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择优势树种">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="平均年龄：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写平均年龄" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="龄组：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择龄组">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="径组：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择径组">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="平均胸径：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写平均胸径" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="平均树高：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写平均树高" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="郁闭度：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写郁闭度" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="森林群落结构：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择森林群落结构">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="林层结构：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写林层结构" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="树种结构：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写树种结构" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="毛竹林分株数：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写毛竹林分株数" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="毛竹散生株数：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写毛竹散生株数" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="天然更新等级：" prop="plot" class="item">
              <el-select v-model="form.plot" class="select" filterable placeholder="请选择天然更新等级">
                <el-option v-for="(item, index) in plotOptions" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="样木总株数：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写样木总株数" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="活立木总蓄积：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写活立木总蓄积" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="林木蓄积：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写林木蓄积" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="造林地情况：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写造林地情况" class="input" />
            </el-form-item>
          </div>

          <div>
            <el-form-item label="作业方式：" prop="plot" class="item">
              <el-input v-model="form.plot" placeholder="请填写作业方式" class="input" />
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

export default {
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
      this.$router.push({ name: 'DataManagementTwo', params: { id: this.id }})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
