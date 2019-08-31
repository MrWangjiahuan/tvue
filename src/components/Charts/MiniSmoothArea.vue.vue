<template>
  <div :class="prefixCls">
    <div class="chart-wrapper" :style="{ height: 46 }">
      <v-chart
        :force-fit="true"
        :height="100"
        :data="dataSource"
        :scale="scale"
        :padding="[36, 0, 18, 0]"
      >
        <v-tooltip />
        <v-smooth-line position="x*y" :size="2" />
        <v-smooth-area position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Trend extends Vue {
  @Prop({ default: 'ant-pro-smooth-area' }) public prefixCls!: String
  @Prop({ required: true }) public scale!: any
  @Prop({ required: true }) public dataSource!: any

  private height = 100
}
</script>

<style lang="less" scoped>
@import './less/miniSmoothArea.less';
</style>
