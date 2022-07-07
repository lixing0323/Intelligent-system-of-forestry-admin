<template>
  <el-cascader
    v-model="zones"
    :disabled="options.length===0"
    :options="options"
    clearable
    filterable
    style="width: 100%"
    :placeholder="placeholder"
    @change="zoneChanged"
  />
</template>

<script>
export default {
  name: 'HtCascaderZones',
  props: {
    placeholder: {
      type: String,
      default: '请选择省市区'
    },
    provinceId: {
      type: Number,
      default: null
    },
    cityId: {
      type: Number,
      default: null
    },
    districtId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      options: [],
      zones: []
    }
  },
  created() {
    this.getZones()
  },
  methods: {
    initZones(provinceId, cityId, districtId) {
      const zones = [provinceId, cityId, districtId]
      this.zones = zones.filter(item => item !== null)
    },
    getZones() {
      this.$store.dispatch('cache/getChinaZones')
        .then(zones => {
          this.options = zones
        })
    },
    zoneChanged(zones) {
      const [provinceId, cityId, districtId] = zones
      this.$emit('update:provinceId', provinceId || null)
      this.$emit('update:cityId', cityId || null)
      this.$emit('update:districtId', districtId || null)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
