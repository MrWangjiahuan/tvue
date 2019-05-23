<template>
  <div class="setting-drawer" ref="settingDrawer">
    <a-drawer
      width="300px"
      placement="right"
      :maskClosable="false"
      :closable="false"
      :visible="visible"
      :getContainer="() => $refs.settingDrawer"
      @close="onClose"
    >
      <template v-slot:handle>
        <div class="setting-drawer-handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'" />
        </div>
      </template>
      <div class="setting-drawer-index-content">
        <div style="margin-bottom:24px;">
          <h3 class="setting-drawer-index-title">
            {{ $t('settingDrawer.pageStyleTitle') }}
          </h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">{{
                $t('settingDrawer.dartTooltipTitle')
              }}</template>
              <div
                class="setting-drawer-index-item"
                @click="handleChangeTheme('dark')"
              >
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg"
                  alt="dark"
                />
                <div
                  class="setting-drawer-index-selectIcon"
                  v-if="navTheme === 'dark'"
                >
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">{{
                $t('settingDrawer.lightTooltipTitle')
              }}</template>
              <div
                class="setting-drawer-index-item"
                @click="handleChangeTheme('light')"
              >
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg"
                  alt="light"
                />
                <div
                  class="setting-drawer-index-selectIcon"
                  v-if="navTheme !== 'dark'"
                >
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>
        <div style="margin-bottom: '24px';">
          <h3 class="setting-drawer-index-title">
            {{ $t('settingDrawer.themeTitle') }}
          </h3>
          <div style="height: 20px">
            <a-tooltip
              class="setting-drawer-theme-color-colorBlock"
              v-for="(item, index) in colorList"
              :key="index"
            >
              <template slot="title">{{ item.key }}</template>
              <a-tag :color="item.color" @click="handleChangeColor(item.color)">
                <a-icon
                  type="check"
                  v-if="item.color === primaryColor"
                ></a-icon>
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <a-divider />
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { updateTheme, colorList } from '@/core'
import config from '@/config/defaultSettings'

interface IColorList {
  key: string
  color: string
}

@Component
export default class SettingDrawer extends Vue {
  private visible: boolean = false
  private colorList: Array<IColorList> = colorList
  @Getter layoutMode
  @Getter navTheme
  @Getter primaryColor
  @Getter colorWeak
  @Action('ToggleLayoutMode') toggleLayoutMode
  @Action('ToggleNavTheme') toggleNavTheme
  @Action('TogglePrimaryColor') togglePrimaryColor

  private onClose(): void {
    this.visible = false
  }
  private handleChangeTheme(value: string): void {
    this.toggleNavTheme(value)
  }
  private handleChangeColor(color: string): void {
    if (this.primaryColor !== color) {
      this.togglePrimaryColor(color)
      updateTheme(true, color, this.$t(`globalHeader.themeMessage`))
    }
  }
}
</script>
<style lang="less" src="./index.less" />
