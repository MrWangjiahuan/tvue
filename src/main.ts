require('promise.prototype.finally').shim()
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from '@/locale/enUS'
import zhCN from '@/locale/zhCN'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { Initializer } from '@/core/'
import '@/core/lazy_use'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'enUS',
  messages: {
    enUS: enUS,
    zhCN: zhCN
  }
})

new Vue({
  router,
  store,
  i18n,
  beforeCreate() {
    // 核心函数
    Initializer(false)
  },
  render: h => h(App)
}).$mount('#app')
