import { IRootState } from '@/store/index'

const getters = {
  sidebar: (state: IRootState) => state.app.sidebar,
  device: (state: IRootState) => state.app.device,
  fixSiderbar: (state: IRootState) => state.app.fixSiderbar,
  layoutMode: (state: IRootState) => state.app.layoutMode,
  navTheme: (state: IRootState) => state.app.navTheme,
  language: (state: IRootState) => state.app.language
}

export default getters
