<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { AppDeviceEnquireMixin } from '@/utils/mixins'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import moment from 'moment'
import 'moment/locale/zh-cn'

@Component({
  mixins: [AppDeviceEnquireMixin]
})
export default class App extends Vue {
  @Getter language

  get locale() {
    moment.locale(this.language === 'enUS' ? 'en' : 'zh-cn')
    this.$i18n.locale = this.language === 'enUS' ? 'enUS' : 'zhCN'
    return this.language === 'enUS' ? enUS : zhCN
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
