import Vue from 'vue'
import Storage from 'vue-ls'
import config from '@/config/defaultSettings'
import { Authorized } from '@/components'
import Auth from '@/directives/auth'
import { message, notification } from 'ant-design-vue'
// base library
import '@/core/lazy_lib/lazy_antd'

Vue.config.productionTip = false
Vue.prototype.$message = message
Vue.prototype.$notify = notification

// 全局权限组件
Vue.component('Authorized', Authorized)
Vue.use(Auth)
Vue.use(Storage, config.storageOptions)
