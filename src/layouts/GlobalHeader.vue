<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        style="padding:0;"
        :class="[
          AppModule.fixedHeader && 'ant-header-fixedHeader',
          AppModule.sidebar
            ? 'ant-header-side-opened'
            : 'ant-header-side-closed'
        ]"
      >
        <div v-if="isSideMenu()" class="header">
          <a-icon
            v-if="isMobile()"
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="toggle"
          />
          <a-icon
            v-else
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggle"
          />
          <!-- <user-menu></user-menu> -->
        </div>
        <div v-else :class="['top-nav-header-index', AppModule.navTheme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <Logo class="top-nav-header" :showTitle="!isMobile()" />
              <sider-menu v-if="!isMobile()" mode="horizontal" />
              <a-icon
                v-else
                class="trigger"
                :type="collapsed ? 'menu-fold' : 'menu-unfold'"
                @click="toggle"
              />
            </div>
            <!-- <user-menu class="header-index-right"></user-menu> -->
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import { Mixin, DeviceMixin } from '@/utils/mixins'
import Logo from './tools/Logo.vue'
import SiderMenu from './menu/SiderMenu.vue'

@Component({
  components: {
    Logo,
    SiderMenu
  }
})
export default class GlobalHeader extends Mixins(Mixin, DeviceMixin) {
  @Prop({ default: false }) public collapsed!: boolean

  private visible: boolean = true

  @Emit('toggle')
  private toggle() {
    return
  }
}
</script>

<style lang="less">
.header-animat {
  position: relative;
  z-index: 2;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
</style>
