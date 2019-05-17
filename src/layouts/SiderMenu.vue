<template>
  <div style="width: 256px">
    <a-layout-sider
      :class="[
        'sider',
        isDesktop() ? null : 'shadow',
        AppModule.navTheme,
        AppModule.fixSiderbar ? 'ant-fixed-sidemenu' : null
      ]"
      width="256px"
      :collapsible="true"
      v-model="collapsed"
      :trigger="null"
    >
      <a-menu
        :selectedKeys="selectedKeys"
        :openKeys.sync="openKeys"
        mode="inline"
        :theme="AppModule.navTheme"
      >
        <template v-for="item in menuData">
          <a-menu-item
            v-if="!item.children"
            :key="item.path"
            @click="
              () => $router.push({ path: item.path, query: $route.query })
            "
          >
            <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.path" />
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import { Mixin, DeviceMixin } from '@/utils/mixins'
import SubMenu from './SubMenu.vue'
@Component({
  components: {
    SubMenu
  }
})
export default class SiderMenu extends Mixins(Mixin, DeviceMixin) {
  @Prop({ default: false }) public collapsed!: boolean
  private menuData: any = []
  private routePath = ''
  private selectedKeys: string[] = []
  private openKeys: string[] = []
  private selectedKeysMap = {}
  private openKeysMap = {}

  private created() {
    this.menuData = this.getMenuData(this.$router['options'].routes)
    this.routePath = this.$route.path
    this.selectedKeys = this.selectedKeysMap[this.$route.path]
    this.openKeys = this.collapsed ? [] : this.openKeysMap[this.$route.path]
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
    this.routePath = val
    this.selectedKeys = this.selectedKeysMap[val]
    this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
  }
  @Watch('collapsed')
  collapsedChange(val) {
    this.openKeys = val ? [] : this.openKeysMap[this.routePath]
  }
}
</script>
<style lang="less" scoped></style>
