<template>
  <div>
    <Logo v-if="mode !== 'horizontal'" />
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      :mode="mode"
      :theme="AppModule.navTheme"
      @click="handleClick"
      @openChange="onOpenChange"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.localeTitle }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
  Mixins,
  Emit
} from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Mixin, DeviceMixin } from '@/utils/mixins'
import { check } from '@/utils/auth'
import SubMenu from './SubMenu.vue'
import Logo from '../tools/Logo.vue'

@Component({
  components: {
    SubMenu,
    Logo
  }
})
export default class SiderMenu extends Mixins(Mixin, DeviceMixin) {
  @Prop({ default: false }) public collapsed!: boolean
  @Prop({ default: 'inline' }) public mode!: string
  @Getter language
  private menuData: any = []
  private selectedKeys: string[] = []
  private openKeys: string[] = []
  private openKeysCache: string[] = []
  private selectedKeysMap = {}
  private openKeysMap = {}

  private created() {
    this.menuData = this.getMenuData(this.$router['options'].routes)
    this.selectedKeys = this.selectedKeysMap[this.$route.path]
    // 如果为topmenu 不打开任何菜单
    if (this.mode === 'horizontal') {
      this.openKeys = []
    } else {
      this.openKeys = this.collapsed ? [] : this.openKeysMap[this.$route.path]
    }
  }

  get rootSubmenuKeys(): string[] {
    const keys: string[] = []
    this.menuData.forEach(item => keys.push(item.path))
    return keys
  }

  @Emit('handleClick')
  private handleClick({ item, key, keyPath }) {
    return { item, key, keyPath }
  }

  private onOpenChange(openKeys) {
    // 在水平模式下时执行，并且不再执行后续
    if (this.mode === 'horizontal') {
      this.openKeys = openKeys
      return
    }
    // 解决404路由时 报错BUG
    if (!this.openKeys) {
      this.openKeys = openKeys
    }
    // 非水平模式时
    const latestOpenKey: string = openKeys.find(
      key => !this.openKeys.includes(key)
    )
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.openKeys = openKeys
    } else {
      this.openKeys = latestOpenKey ? ['/', latestOpenKey] : []
    }
  }

  private getMenuData(
    routes: any[] = [],
    parentKeys: any[] = [],
    selectedKey?: string
  ): any {
    const menuData: any = []
    for (let item of routes) {
      if (item.meta && item.meta.authority && !check(item.meta.authority)) {
        continue
      }
      if (item.name && !item.hideInMenu) {
        // 由于subMenu为函数式组件 没有this实例 所以取不到$t
        // 在这里直接把title处理成当前语言
        // localeTitle 国际化显示的路由菜单名称
        if (item.meta && item.meta.title) {
          item.meta.localeTitle = this.$t(`menu.${item.meta.title}`)
        }
        this.openKeysMap[item.path] = parentKeys
        this.selectedKeysMap[item.path] = [selectedKey || item.path]
        const newItem = { ...item }
        delete newItem.children
        if (item.children && !item.hideChildrenInMenu) {
          newItem.children = this.getMenuData(item.children, [
            ...parentKeys,
            item.path
          ])
        } else {
          this.getMenuData(
            item.children,
            selectedKey ? parentKeys : [...parentKeys, item.path],
            selectedKey || item.path
          )
        }
        menuData.push(newItem)
      } else if (
        !item.hideInMenu &&
        !item.hideChildrenInMenu &&
        item.children
      ) {
        menuData.push(
          ...this.getMenuData(item.children, [...parentKeys, item.path])
        )
      }
    }
    return menuData
  }

  @Watch('$route.path')
  routePathChange(val) {
    this.selectedKeys = this.selectedKeysMap[val]
    this.openKeys = []
    this.openKeys = this.openKeys.concat(this.openKeysMap[val])
    // 缓存上一次openKeys
    this.openKeysCache = this.openKeys.concat()
  }

  @Watch('language')
  languageChange(val) {
    this.menuData = this.getMenuData(this.$router['options'].routes)
  }

  @Watch('collapsed')
  collapsedChange(val) {
    if (val) {
      // 缓存上一次openKeys
      if (this.openKeys) {
        this.openKeysCache = this.openKeys.concat()
        this.openKeys = []
      }
    } else {
      this.openKeys = this.openKeysCache
    }
  }
}
</script>
