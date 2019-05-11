<template>
  <div style="text-align: center;">
    <Logo />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Logo from '@/assets/logo.svg'
@Component({
  components: {
    Logo
  }
})
export default class ErrorPage404 extends Vue {}
</script>
