import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import core from '@/core/'
import '@/core/lazy_use'

new Vue({
  router,
  store,
  created() {
    core()
  },
  render: h => h(App)
}).$mount('#app')
