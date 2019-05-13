<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import SubMenu from './SubMenu.vue'
@Component({
  components: {
    SubMenu
  }
})
export default class SiderMenu extends Vue {
  @Prop({ default: 'dark' }) public theme!: string
  private collapsed: boolean = false
  private menuData: any = []
  private selectedKeys = []
  private openKeys = []
  private selectedKeyMap = {}
  private openKeysMap = {}

  private created() {
    this.menuData = this.getMenuData(this.$router['options'].routes)
    this.selectedKeys = this.selectedKeyMap[this.$route.path]
    this.openKeys = this.collapsed ? [] : this.openKeysMap[this.$route.path]
  }
  private toggleCollapsed() {
    this.collapsed = !this.collapsed
  }
  private getMenuData(
    routes: any[] = [],
    parentKeys: any[] = [],
    selectedKey?: string
  ): any {
    // if (routes.length == 0) {
    //   return []
    // }
    let menuData: any[] = []
    console.log(routes)
    routes.forEach(item => {
      if (item.name && item.meta && !item.meta.hideInMenu) {
        this.openKeysMap[item.path] = parentKeys
        this.selectedKeyMap[item.path] = [selectedKey || item.path]
        const newItem = { ...item }
        delete newItem.children
        if (item.children && item.meta && !item.meta.hideChildrenInMenu) {
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
        item.meta &&
        !item.meta.hideInMenu &&
        !item.meta.hideChildrenInMenu &&
        item.children
      ) {
        menuData.push(
          ...this.getMenuData(item.children, [...parentKeys, item.path])
        )
      }
    })
    return menuData
  }

  @Watch('$route.path')
  routePathChange(val) {
    console.log(
      '%cval: ',
      'color: MidnightBlue; background: Aquamarine; font-size: 20px;',
      val
    )
    this.selectedKeys = this.selectedKeyMap[val]
    this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    console.log(
      '%cthis.openKeys : ',
      'color: MidnightBlue; background: Aquamarine; font-size: 20px;',
      this.openKeysMap
    )
  }
}
</script>
<style lang="less" scoped></style>
