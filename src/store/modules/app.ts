import Vue from 'vue'
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import * as types from '@/store/mutation-types'
import store from '@/store'
import { DEVICE_TYPE } from '@/utils/device'
import { getNotices } from '@/api/user'

export interface IAppState {
  device: DEVICE_TYPE
  navTheme: string
  primaryColor: string
  sidebar: boolean
  layoutMode: string
  contentWidth: string
  fixedHeader: boolean
  fixSiderbar: boolean
  autoHideHeader: boolean
  colorWeak: boolean
  multiTab: boolean
  language: string
  // notice
  notices: any
  fetchingStatus: object
  notifyCount: number
  unreadCount: number
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public sidebar = true
  public device = DEVICE_TYPE.DESKTOP
  public navTheme = ''
  public primaryColor = ''
  public layoutMode = ''
  public contentWidth = ''
  public colorWeak = false
  public fixedHeader = false
  public autoHideHeader = false
  public fixSiderbar = false
  public multiTab = true
  public language = 'enUS'

  // notice
  public notices = []
  public fetchingStatus = { notice: false }
  public notifyCount = 0
  public unreadCount = 0

  @Mutation
  public SET_SIDEBAR(type: boolean) {
    Vue.ls.set(types.DEFAULT_SIDEBAR_TYPE, type)
    this.sidebar = type
  }

  @Mutation
  public TOGGLE_NAV_THEME(theme: string) {
    Vue.ls.set(types.DEFAULT_NAV_THEME, theme)
    this.navTheme = theme
  }

  @Mutation
  public TOGGLE_PRIMARY_COLOR(color: string) {
    Vue.ls.set(types.DEFAULT_PRIMARY_COLOR, color)
    this.primaryColor = color
  }

  @Mutation
  public CLOSE_SIDEBAR() {
    Vue.ls.set(types.DEFAULT_SIDEBAR_TYPE, false)
    this.sidebar = false
  }

  @Mutation
  public TOGGLE_DEVICE(device: DEVICE_TYPE) {
    this.device = device
  }

  @Mutation
  public TOGGLE_LAYOUT_MODE(layoutMode: string) {
    Vue.ls.set(types.DEFAULT_LAYOUT_MODE, layoutMode)
    this.layoutMode = layoutMode
  }

  @Mutation
  public TOGGLE_CONTENT_WIDTH(contentWidth: string) {
    Vue.ls.set(types.DEFAULT_CONTENT_WIDTH_TYPE, contentWidth)
    this.contentWidth = contentWidth
  }

  @Mutation
  public TOGGLE_FIXED_HEADER(fixed: boolean) {
    Vue.ls.set(types.DEFAULT_FIXED_HEADER, fixed)
    this.fixedHeader = fixed
  }

  @Mutation
  public TOGGLE_FIXED_HEADER_HIDDEN(show: boolean) {
    Vue.ls.set(types.DEFAULT_FIXED_HEADER_HIDDEN, show)
    this.autoHideHeader = show
  }

  @Mutation
  public TOGGLE_FIXED_SIDERBAR(fixSiderbar: boolean) {
    Vue.ls.set(types.DEFAULT_FIXED_SIDEMENU, fixSiderbar)
    this.fixSiderbar = fixSiderbar
  }
  @Mutation
  public TOGGLE_MULTI_TAB(payload: boolean) {
    Vue.ls.set(types.DEFAULT_MULTI_TAB, payload)
    this.multiTab = payload
  }

  @Mutation
  public TOGGLE_COLOR_WEAK(payload: boolean) {
    Vue.ls.set(types.DEFAULT_COLOR_WEAK, payload)
    this.colorWeak = payload
  }

  @Mutation
  public TOGGLE_LANGUAGE(lan: string) {
    Vue.ls.set(types.DEFAULT_LANGUAGE, lan)
    this.language = lan
  }

  // notice
  @Mutation
  public CHANGE_FETCH_STATUS(payload: any) {
    this.fetchingStatus = {
      ...this.fetchingStatus,
      ...payload
    }
  }

  @Mutation
  public SAVE_CLEAR_NOTICES(payload: any) {
    this.notices = this.notices.filter((item: any) => item.type !== payload)
  }

  @Mutation
  public SAVE_NOTICES(payload: any) {
    this.notices = payload
  }

  @Mutation
  public CHANGE_NOTIFY_COUNT({ notifyCount = 0, unreadCount = 0 }) {
    this.notifyCount = notifyCount
    this.unreadCount = unreadCount
  }

  @Action({ commit: 'SET_SIDEBAR' })
  public SetSidebar(type: boolean) {
    return type
  }

  @Action
  public CloseSidebar() {
    this.context.commit('CLOSE_SIDEBAR')
  }

  @Action({ commit: 'TOGGLE_NAV_THEME' })
  public ToggleNavTheme(theme: string) {
    return theme
  }

  @Action({ commit: 'TOGGLE_PRIMARY_COLOR' })
  public TogglePrimaryColor(color: string) {
    return color
  }

  @Action({ commit: 'TOGGLE_CONTENT_WIDTH' })
  public ToggleContentWidth(contentWidth: string) {
    return contentWidth
  }

  @Action({ commit: 'TOGGLE_DEVICE' })
  public ToggleDevice(device: DEVICE_TYPE) {
    return device
  }

  @Action({ commit: 'TOGGLE_LAYOUT_MODE' })
  public ToggleLayoutMode(layoutMode: string) {
    return layoutMode
  }

  @Action({ commit: 'TOGGLE_MULTI_TAB' })
  public ToggleMultiTab(payload: boolean) {
    return payload
  }

  @Action({ commit: 'TOGGLE_FIXED_HEADER_HIDDEN' })
  public ToggleFixedHeaderHidden(show: boolean) {
    return show
  }

  @Action({ commit: 'TOGGLE_COLOR_WEAK' })
  public ToggleColorWeak(weakFlag: boolean) {
    return weakFlag
  }

  @Action({ commit: 'TOGGLE_FIXED_SIDERBAR' })
  public ToggleFixSiderbar(fixSiderbar: boolean) {
    return fixSiderbar
  }

  @Action
  public ToggleFixedHeader(fixedHeader: boolean) {
    if (!fixedHeader) {
      this.context.commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
    }
    this.context.commit('TOGGLE_FIXED_HEADER', fixedHeader)
  }

  @Action({ commit: 'TOGGLE_LANGUAGE' })
  public ToggleLanguage(lan: string) {
    return lan
  }

  // notice
  @Action
  async FetchNotices() {
    const { commit } = this.context
    commit('CHANGE_FETCH_STATUS', true)
    const res = await getNotices()
    const { data = [] } = res.data
    commit('SAVE_NOTICES', data)
    const unreadCount = this.notices.filter((item: any) => !item.read).length
    commit('CHANGE_NOTIFY_COUNT', { unreadCount, notifyCount: data.length })
    commit('CHANGE_FETCH_STATUS', false)
  }

  @Action
  ClearNotices(payload) {
    const { commit } = this.context
    commit('SAVE_CLEAR_NOTICES', payload)
    const count = this.notices.length
    const unreadCount = this.notices.filter((item: any) => !item.read).length
    commit('CHANGE_NOTIFY_COUNT', { unreadCount, notifyCount: count })
  }

  @Action
  ChangeNoticeReadState(payload) {
    const { commit } = this.context
    const notices = this.notices.map((item: any) => {
      const notice = { ...item }
      if (notice.id === payload) {
        notice.read = true
      }
      return notice
    })
    commit('SAVE_NOTICES', notices)
    commit('CHANGE_NOTIFY_COUNT', {
      unreadCount: notices.filter(item => !item.read).length,
      notifyCount: notices.length
    })
  }
}

export const AppModule = getModule(App)
