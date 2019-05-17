<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppDeviceEnquireMixin } from '@/utils/mixins'

@Component({
  mixins: [AppDeviceEnquireMixin]
})
export default class App extends Vue {}
</script>

<style>
#app {
  height: 100%;
}
</style>
