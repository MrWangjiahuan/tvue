import Vue from 'vue'
import Storage from 'vue-ls'
import config from '@/config/defaultSettings'
import { Authorized } from '@/components'
import Auth from '@/directives/auth'
// base library
import '@/core/lazy_lib/lazy_antd'

Vue.config.productionTip = false

// 全局权限组件
Vue.component('Authorized', Authorized)
Vue.use(Auth)
Vue.use(Storage, config.storageOptions)
