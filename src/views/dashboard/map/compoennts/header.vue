<template>
  <div class="homepage-png">
    <el-image :src="HomepagePNG" />
  </div>
</template>

<script>
import HomepagePNG from '@/assets/city/home.png'
export default {
  components: { },
  data() {
    return {
      HomepagePNG
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
