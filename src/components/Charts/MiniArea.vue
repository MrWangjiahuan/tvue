<template>
  <div class="antv-chart-mini">
    <div class="chart-wrapper" :style="{ height: 46 }">
      <v-chart
        :force-fit="true"
        :height="height"
        :data="data"
        :padding="[36, 0, 18, 0]"
      >
        <v-tooltip />
        <v-smooth-area position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moment from 'moment'

const data: any = []
const beginDay = new Date().getTime()

for (let i = 0; i < 10; i++) {
  data.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      'YYYY-MM-DD'
    ),
    y: Math.round(Math.random() * 10)
  })
}

const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]
const scale = [
  {
    dataKey: 'x',
    min: 2
  },
  {
    dataKey: 'y',
    title: '时间',
    min: 1,
    max: 22
  }
]

@Component
export default class MiniArea extends Vue {
  private data = data
  private tooltip = tooltip
  private scale = scale
  private height = 100
}
</script>

<style lang="less" scoped>
.antv-chart-mini {
  position: relative;
  width: 100%;

  .chart-wrapper {
    position: absolute;
    bottom: -28px;
    width: 100%;
  }
}
</style>
