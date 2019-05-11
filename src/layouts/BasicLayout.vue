<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <div class="logo">Tvue</div>
        <sider-menu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          />
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <setting-drawer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from './Header.vue'
import Footer from './Footer.vue'
import SiderMenu from './SiderMenu.vue'
import SettingDrawer from '@/components/settingDrawer/index.vue'

@Component({
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  }
})
export default class BasicLayout extends Vue {
  private collapsed: boolean = false

  get navTheme(): string | (string | null)[] {
    return this.$route.query.navTheme || 'dark'
  }
  get navLayout(): string | (string | null)[] {
    return this.$route.query.navLayout || 'left'
  }
}
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
  cursor: pointer;
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
