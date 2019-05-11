<template>
  <div>
    <Header />
    <sider-menu />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from './Header.vue'
import Footer from './Footer.vue'
import SiderMenu from './SiderMenu.vue'

@Component({
  components: {
    Header,
    Footer,
    SiderMenu
  }
})
export default class BasicLayout extends Vue {}
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>
