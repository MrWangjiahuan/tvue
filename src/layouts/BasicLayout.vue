<template>
  <!-- <div>
    <a-layout :class="['layout', AppModule.device]">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo">Tvue</div>
        <sider-menu :theme="navTheme"/>
      </a-layout-sider>
      <a-layout
        :class="[AppModule.layoutMode, `content-width-${AppModule.contentWidth}`]"
        :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
      >
        <global-header
          :mode="AppModule.layoutMode"
          :theme="AppModule.navTheme"
          :collapsed="collapsed"
          :device="AppModule.device"
        />
        <a-layout-content style="margin: 0 16px">
          <router-view/>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer/>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <setting-drawer/>
  </div>-->
  <a-layout :class="['layout', AppModule.device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${AppModule.navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="collapsed = false"
    >
      <!-- <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>-->
      <sider-menu />
    </a-drawer>

    <sider-menu :collapsed="collapsed" v-else-if="isSideMenu()" />

    <a-layout
      :class="[AppModule.layoutMode, `content-width-${AppModule.contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- layout header -->
      <global-header :collapsed="collapsed" @toggle="toggle" />

      <!-- layout content -->
      <a-layout-content
        :style="{
          height: '100%',
          margin: '24px 24px 0',
          paddingTop: AppModule.fixedHeader ? '64px' : '0'
        }"
      >
        <!-- <multi-tab v-if="multiTab"></multi-tab> -->
        <transition name="page-transition">
          <router-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <!-- <global-footer /> -->
      </a-layout-footer>

      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer></setting-drawer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator'
import { Mixin, DeviceMixin } from '@/utils/mixins'
import { triggerWindowResizeEvent } from '@/utils/helper/'
import config from '@/config/defaultSettings'
import GlobalHeader from './GlobalHeader.vue'
import Footer from './Footer.vue'
import SiderMenu from './SiderMenu.vue'
import SettingDrawer from '@/components/settingDrawer/index.vue'

@Component({
  components: {
    GlobalHeader,
    Footer,
    SiderMenu,
    SettingDrawer
  }
})
export default class BasicLayout extends Mixins(Mixin, DeviceMixin) {
  private collapsed: boolean = false
  get contentPaddingLeft() {
    if (!this.AppModule.fixSiderbar || this.isMobile()) {
      return '0'
    }
    if (this.AppModule.sidebar) {
      return '256px'
    }
    return '80px'
  }
  private toggle() {
    this.collapsed = !this.collapsed
    this.AppModule.SetSidebar(!this.collapsed)
    triggerWindowResizeEvent()
  }
}
</script>

<style lang="less">
@import url('../assets/styles/global.less');
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
