<template>
  <div>
    <a-drawer
      placement="right"
      :maskClosable="false"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'" />
        </div>
      </template>
      <div>
        <h2>整体风格定制</h2>
        <a-radio-group
          :value="navTheme || 'dark'"
          @change="e => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          :value="layoutMode || 'sidemenu'"
          @change="e => handleSettingChange('layout', e.target.value)"
        >
          <a-radio value="sidemenu">左侧</a-radio>
          <a-radio value="topmenu">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class SettingDrawer extends Vue {
  private visible: boolean = false

  @Getter layoutMode
  @Getter navTheme

  @Action('ToggleLayoutMode') toggleLayoutMode
  @Action('ToggleNavTheme') toggleNavTheme

  private onClose(): void {
    this.visible = false
  }

  private handleSettingChange(type: string, value: string): void {
    if (type === 'layout') {
      this.toggleLayoutMode(value)
    }
    if (type === 'navTheme') {
      this.toggleNavTheme(value)
    }
  }
}
</script>
<style lang="less" scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background-color: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
  cursor: pointer;
}
</style>
