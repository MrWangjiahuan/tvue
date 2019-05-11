<template>
  <div>
    <div class="desc">Ant Design Vue Pro</div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class UserLayout extends Vue {}
</script>
<style lang="less" scoped></style>
