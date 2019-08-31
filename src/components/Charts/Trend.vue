<template>
  <div class="chart-trend">
    {{ term }}
    <span>{{ rate }}%</span>
    <span :class="['trend-icon', trend]">
      <a-icon :type="'caret-' + trend" />
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Trend extends Vue {
  @Prop({ default: '' }) public term!: String
  @Prop({ default: null }) public rate!: number
  @Prop({ default: null }) public type!: boolean

  private trend = this.type ? 'up' : 'down'
}
</script>

<style lang="less" scoped>
.chart-trend {
  display: inline-block;
  font-size: 14px;
  line-height: 22px;

  .trend-icon {
    font-size: 12px;

    &.up,
    &.down {
      margin-left: 4px;
      position: relative;
      top: 1px;

      i {
        font-size: 12px;
        transform: scale(0.83);
      }
    }

    &.up {
      color: #f5222d;
    }
    &.down {
      color: #52c41a;
      top: -1px;
    }
  }
}
</style>
