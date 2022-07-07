<template>
  <el-popover v-model="visible" placement="top" :width="width">
    <div slot="default">
      <p>{{ confirmTitle }}</p>
      <div style="text-align: right; margin: 0">
        <ht-button type="text" size="mini" @click="visible=false">{{ negativeButtonTitle }}</ht-button>
        <ht-button type="primary" size="mini" @click="buttonClicked">{{ positiveButtonTitle }}</ht-button>
      </div>
    </div>
    <ht-button
      v-if="dangerText"
      slot="reference"
      :loading="loading"
      :type="type"
      :size="size"
      :icon="icon"
      :disabled="disabled"
      :style="{ fontWeight: fontWeight }"
      :class="[
        disabled ? '' : 'danger-btn',
        {
          'is-disabled': disabled
        }
      ]"
    >
      <slot />
    </ht-button>
    <ht-button v-else slot="reference" :style="{ color: buttonColor, fontWeight: fontWeight }" :loading="loading" :type="type" :size="size" :icon="icon" :disabled="disabled">
      <slot />
    </ht-button>
  </el-popover>
</template>

<script>
export default {
  name: 'HtPopoverButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    width: {
      type: Number,
      default: 180
    },
    positiveButtonTitle: {
      type: String,
      default: '确认'
    },
    negativeButtonTitle: {
      type: String,
      default: '取消'
    },
    confirmTitle: {
      type: String,
      default: '是否确认?'
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'mini'
    },
    icon: {
      type: String,
      default: ''
    },
    dangerText: {
      type: Boolean,
      default: false
    },
    context: { type: [Object, String, Number, Array], default: null },
    buttonColor: { type: String, default: null },
    fontWeight: { type: String, default: 'normal' }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    buttonClicked() {
      this.visible = false
      this.$emit('confirmed', this.context)
    }
  }
}
</script>

<style lang="scss" scoped>
  .danger-btn {
    color: red;
  }

  .bt-height {
    line-height: 36px;
  }
</style>
