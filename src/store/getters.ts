import { IRootState } from '@/store/index'

const getters = {
  sidebar: (state: IRootState) => state.app.sidebar,
  device: (state: IRootState) => state.app.device,
  fixSiderbar: (state: IRootState) => state.app.fixSiderbar,
  layoutMode: (state: IRootState) => state.app.layoutMode,
  navTheme: (state: IRootState) => state.app.navTheme,
  language: (state: IRootState) => state.app.language,
  primaryColor: (state: IRootState) => state.app.primaryColor,
  colorWeak: (state: IRootState) => state.app.colorWeak,
  notices: (state: IRootState) => state.app.notices,
  unreadCount: (state: IRootState) => state.app.unreadCount,
  fetchingNotices: (state: IRootState) =>
    (state.app.fetchingStatus as any).notice
}

export default getters
