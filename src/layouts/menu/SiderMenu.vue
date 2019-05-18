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
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
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
  private menuData: any = []
  private selectedKeys: string[] = []
  private openKeys: string[] = []
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
    console.log(this.menuData)
    return { item, key, keyPath }
  }

  private onOpenChange(openKeys) {
    // 在水平模式下时执行，并且不再执行后续
    if (this.mode === 'horizontal') {
      this.openKeys = openKeys
      return
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
      // if (item.meta && item.meta.authority && !check(item.meta.authority)) {
      //   continue;
      // }
      if (item.name && !item.hideInMenu) {
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
    this.openKeys = this.collapsed
      ? []
      : this.openKeys.concat(this.openKeysMap[val])
  }
  @Watch('collapsed')
  collapsedChange(val) {
    // 如果为关闭状态 不打开任何菜单
    this.openKeys = val
      ? []
      : this.openKeys.concat(this.openKeysMap[this.$route.path])
  }
}
</script>
<style lang="less" scoped></style>
