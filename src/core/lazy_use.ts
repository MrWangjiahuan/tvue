import Vue from 'vue'
import Storage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import '@/core/lazy_lib/lazy_antd'

Vue.config.productionTip = false

Vue.use(Storage, config.storageOptions)
