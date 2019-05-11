<template>
  <div class="header">
    header
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Header extends Vue {}
</script>
<style lang="less" scoped>
.header {
  float: right;
}
</style>
