import { IRootState } from '@/store/index'

const getters = {
  sidebar: (state: IRootState) => state.app.sidebar,
  device: (state: IRootState) => state.app.device
}

export default getters
