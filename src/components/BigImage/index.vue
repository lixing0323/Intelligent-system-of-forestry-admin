<template>
  <div v-if="isShow" class="img-view" @click="bigImg">
    <!-- 遮罩层 -->
    <div class="img-layer" />
    <div class="img">
      <img v-if="imgSrc" :src="imgSrc">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 图片地址
    imgSrc: undefined,
    // 是否显示
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    bigImg() {
      // 发送事件
      this.$emit('update:isShow', false)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* bigimg */

.img-view {
  position: relative;
  width: 100%;
  height: 100%;
}

/*遮罩层样式*/
.img-view .img-layer {
  position: fixed;
  z-index: 2999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/*不限制图片大小，实现居中*/
.img-view .img img {
  max-width: 50%;
  max-height: 70%;
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 250px;
  margin: auto;
  z-index: 3000;
}
</style>
