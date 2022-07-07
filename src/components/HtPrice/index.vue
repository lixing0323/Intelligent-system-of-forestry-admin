<template>
  <span class="money">{{ priceYuan }}</span>
</template>

<script>
import accounting from 'accounting'
export default {
  name: 'HtPrice',
  props: {
    price: { type: Number, default: 0.000 },
    unit: { type: String, default: 'yuan' }
  },
  computed: {
    priceYuan() {
      if (this.price) {
        const price = this.unit === 'yuan' ? this.price : this.price / 100
        return accounting.formatMoney(price, `￥`, 3, ',', '.')
      } else {
        return '￥0.000'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/styles/element-variables.scss';
 .money {
   color: $--color-primary;
   font-weight: bold;
 }
</style>
