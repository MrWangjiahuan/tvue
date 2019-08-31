<template>
  <div :class="[prefixCls]">
    <slot name="subtitle">
      <div :class="[`${prefixCls}-subtitle`]">
        {{ typeof subTitle === 'string' ? subTitle : subTitle() }}
      </div>
    </slot>
    <div class="number-info-value">
      <span>{{ total }}</span>
      <span class="sub-total">
        {{ subTotal }}
        <icon :type="`caret-${status}`" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Icon from 'ant-design-vue/es/icon'

@Component({
  components: {
    Icon
  }
})
export default class NumberInfo extends Vue {
  @Prop({ default: 'ant-pro-number-info' }) public prefixCls!: string
  @Prop({ required: true }) public total!: number
  @Prop({ required: true }) public subTotal!: number
  @Prop({ default: '' }) public subTitle!: string | Function
  @Prop({ default: 'up' }) public status!: string
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
