<template>
  <div class="chart-mini-progress">
    <div class="target" :style="{ left: target + '%' }">
      <span :style="{ backgroundColor: color }" />
      <span :style="{ backgroundColor: color }" />
    </div>
    <div class="progress-wrapper">
      <div
        class="progress"
        :style="{
          backgroundColor: color,
          width: percentage + '%',
          height: height
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class MiniProgress extends Vue {
  @Prop({ default: 0 }) public target!: number
  @Prop({ default: '10px' }) public height!: string
  @Prop({ default: '#13C2C2' }) public color!: string
  @Prop({ default: 0 }) public percentage!: number
}
</script>
<style lang="less" src="./less/miniProgress.less" scoped />
