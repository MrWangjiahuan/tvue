<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
      <router-link
        v-if="item.name != name && index != 1"
        :to="{ path: item.path === '' ? '/' : item.path }"
        >{{ item.meta.title }}</router-link
      >
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class Breadcrumb extends Vue {
  private name: string = ''
  private breadList: any = []

  private created() {
    this.getBreadcrumb()
  }

  private getBreadcrumb() {
    this.breadList = []
    this.name = this.$route.name || ''
    this.$route.matched.forEach(item => {
      this.breadList.push(item)
    })
  }

  @Watch('$route')
  routeChange() {
    this.getBreadcrumb()
  }
}
</script>
