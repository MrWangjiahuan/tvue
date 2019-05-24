<template>
  <div class="header-right-layout-wrapper">
    <div class="content-box">
      <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o" class="icon"></a-icon>
        </span>
      </a>
      <Notice class="action" />
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <!-- <a-avatar class="avatar" size="small" :src="avatar()"/>
          <span>{{ nickname() }}</span>-->
          <span>ssss</span>
        </span>
        <a-menu
          slot="overlay"
          class="user-dropdown-menu-wrapper"
          :style="contentWith"
        >
          <a-menu-item key="0" :style="contentWith">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1" :style="contentWith">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2" disabled :style="contentWith">
            <a-icon type="setting" />
            <span>测试</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3" :style="contentWith">
            <a href="javascript:;">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-icon type="global" class="icon" />
        </span>
        <a-menu
          class="user-dropdown-menu-wrapper"
          slot="overlay"
          @click="localeChange"
          :selectedKeys="[language]"
          :style="contentWith"
        >
          <a-menu-item key="zhCN" :style="contentWith">
            <span role="img" aria-label="简体中文">🇨🇳</span>&nbsp;简体中文
          </a-menu-item>
          <a-menu-item key="enUS" :style="contentWith">
            <span role="img" aria-label="English">🇬🇧</span>&nbsp;English
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator'
import throttle from 'lodash/throttle'
import { Getter, Action } from 'vuex-class'
import { DeviceMixin } from '@/utils/mixins'
import { Notice } from '@/components/'

@Component({
  name: 'HeaderRightLayout',
  components: {
    Notice
  }
})
export default class HeaderRightLayout extends Mixins(DeviceMixin) {
  private clientWidth: number = 0

  @Getter language

  @Action('ToggleLanguage') toggleLanguage

  // 如果为手机端下拉菜单则为屏幕宽度
  get contentWith() {
    return this.isMobile() ? `width:${this.clientWidth}px;` : ''
  }

  private mounted() {
    this.clientWidth = window.innerWidth
    window.onresize = throttle(() => {
      this.clientWidth = window.innerWidth
    }, 1000)
  }

  private localeChange() {
    return this.$message
      .loading(this.$t('globalHeader.message'), 1)
      .then(() => {
        this.toggleLanguage(this.language === 'enUS' ? 'zhCN' : 'enUS')
        this.$i18n.locale = this.language === 'enUS' ? 'zhCN' : 'enUS'
      })
  }
}
</script>
