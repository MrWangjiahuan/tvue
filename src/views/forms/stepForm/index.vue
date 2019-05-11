<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class StepForm extends Vue {}
</script>
<style lang="less" scoped></style>
