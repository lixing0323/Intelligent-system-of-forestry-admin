<template>
  <div>
    <ht-dialog title="图片预览" width="45%" :append-to-body="inner" :visible.sync="dialogVisible" center>
      <span v-for="image in images" :key="image">
        <img v-if="image" class="image-size" :src="image" @click="handelClickToEnlargeImage($event)">
      </span>
    </ht-dialog>

    <app-big-image :is-show.sync="bigImageVisible" :img-src="bigImageSrc" />
  </div>
</template>

<script>
// 图片的预览组件
import AppBigImage from './index'

export default {
  components: {
    AppBigImage
  },
  props: {
    // 图片地址
    images: undefined,
    // 是否是对话框内的预览界面
    inner: {
      type: Boolean,
      default: false
    },
    // 高度
    height: undefined
  },
  data() {
    return {
      dialogVisible: false,
      start: 0,
      // 大图是否显示
      bigImageVisible: false,
      // 大图数据
      bigImageSrc: undefined
    }
  },
  methods: {
    open(url) {
      this.dialogVisible = true
    },
    // 点击放大图片
    handelClickToEnlargeImage(e) {
      this.bigImageVisible = true
      this.bigImageSrc = e.currentTarget.src
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.image-size {
  width: 100px;
  height: 100px;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
