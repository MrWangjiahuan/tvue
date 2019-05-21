import Vue from 'vue'
import * as types from '@/store/mutation-types'
import { AppModule } from '@/store/modules/app'
import config from '@/config/defaultSettings'

export default function Initializer(): void {
  AppModule.SET_SIDEBAR(Vue.ls.get(types.DEFAULT_SIDEBAR_TYPE, true))
  AppModule.TOGGLE_NAV_THEME(
    Vue.ls.get(types.DEFAULT_NAV_THEME, config.navTheme)
  )
  AppModule.TOGGLE_LAYOUT_MODE(
    Vue.ls.get(types.DEFAULT_LAYOUT_MODE, config.layoutMode)
  )
  AppModule.TOGGLE_FIXED_HEADER(
    Vue.ls.get(types.DEFAULT_FIXED_HEADER, config.fixedHeader)
  )
  AppModule.TOGGLE_FIXED_SIDERBAR(
    Vue.ls.get(types.DEFAULT_FIXED_SIDEMENU, config.autoHideHeader)
  )
  AppModule.TOGGLE_CONTENT_WIDTH(
    Vue.ls.get(types.DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth)
  )
  AppModule.TOGGLE_FIXED_HEADER_HIDDEN(
    Vue.ls.get(types.DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader)
  )
  AppModule.TOGGLE_COLOR_WEAK(
    Vue.ls.get(types.DEFAULT_COLOR_WEAK, config.colorWeak)
  )
  AppModule.TOGGLE_PRIMARY_COLOR(
    Vue.ls.get(types.DEFAULT_PRIMARY_COLOR, config.primaryColor)
  )
  AppModule.TOGGLE_MULTI_TAB(
    Vue.ls.get(types.DEFAULT_MULTI_TAB, config.multiTab)
  )
  AppModule.TOGGLE_LANGUAGE(Vue.ls.get(types.DEFAULT_LANGUAGE, config.language))
}
