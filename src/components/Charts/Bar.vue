<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart
      height="254"
      :data="data"
      :forceFit="true"
      :padding="['auto', 'auto', '40', '50']"
    >
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y" />
    </v-chart>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Bar extends Vue {
  @Prop({ default: null }) public data!: any
  @Prop({ default: '' }) public title!: string
  @Prop({
    default: () => {
      return [
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
    }
  })
  public scale!: Array<any>
  @Prop({
    default: () => {
      return [
        'x*y',
        (x, y) => ({
          name: x,
          value: y
        })
      ]
    }
  })
  public tooltip!: Array<any>
}
</script>
