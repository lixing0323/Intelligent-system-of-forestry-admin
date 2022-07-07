<template>
  <el-card>
    <div class="flex-container">
      <div class="item" />
      <div class="middle">
        <el-steps class="steps" :active="step" finish-status="success" simple>
          <el-step title="基本信息" icon="el-icon-s-grid" />
          <el-step title="地貌/土壤信息" icon="el-icon-s-data" />
          <el-step title="类别详情" icon="el-icon-s-tools" />
        </el-steps>

        <div class="slot business-information-step">
          <slot />
        </div>

        <div class="center-button">
          <el-button v-if="step !== 0" @click="handleToPrevious()">上一步</el-button>
          <el-button v-if="step !== 2" type="primary" :loading="nextBtLoading" @click="handleToNext()">下一步</el-button>
          <el-button :loading="saveBtLoading" @click="handleToSave()">保存</el-button>
          <el-button v-if="step === 2" type="primary" :loading="submitBtLoading" @click="handleToSubmit()">提交</el-button>
          <el-button @click="handleToCancel()">取消</el-button>
        </div>
      </div>
      <div class="item" />
    </div>
  </el-card>
</template>

<script>
// 步骤组件
export default {
  components: {
  },
  props: {
    step: {
      type: [String, Number],
      default: undefined
    },
    nextBtLoading: {
      type: Boolean,
      default: false
    },
    saveBtLoading: {
      type: Boolean,
      default: false
    },
    submitBtLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    // 上一步
    handleToPrevious() {
      this.$emit('previous')
    },
    // 下一步
    handleToNext() {
      this.$emit('next')
    },
    // 保存
    handleToSave() {
      this.$emit('save')
    },
    // 提交
    handleToSubmit() {
      this.$emit('submit')
    },
    // 取消
    handleToCancel() {
      this.$router.push({ name: 'DataManagementList' })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-wrap: nowrap;
  .item {
    width: 200px;
  }
  .middle {
    width: 100%;
  }
}
.slot {
  margin-top: 30px;
  margin-bottom: 30px;
}
.center-button {
  text-align: center;
  margin-top: 80px;
}
</style>
