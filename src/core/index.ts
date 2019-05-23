import Vue from 'vue'
import * as types from '@/store/mutation-types'
import { AppModule } from '@/store/modules/app'
import config from '@/config/defaultSettings'
import { message } from 'ant-design-vue/es'

let lessNodesAppended

export const colorList = [
  {
    key: '薄暮',
    color: '#F5222D'
  },
  {
    key: '火山',
    color: '#FA541C'
  },
  {
    key: '日暮',
    color: '#FAAD14'
  },
  {
    key: '明青',
    color: '#13C2C2'
  },
  {
    key: '极光绿',
    color: '#52C41A'
  },
  {
    key: '拂晓蓝（默认）',
    color: '#1890FF'
  },
  {
    key: '极客蓝',
    color: '#2F54EB'
  },
  {
    key: '酱紫',
    color: '#722ED1'
  }
]

export const updateTheme = (
  showMessage: boolean,
  primaryColor: string,
  mess?: any
): void => {
  console.log(showMessage)
  if (!primaryColor) {
    return
  }
  let hideMessage
  if (showMessage) {
    hideMessage = message.loading(mess, 0)
  }
  function buildTheme() {
    if (!window.less) {
      return
    }
    setTimeout(
      () => {
        window.less
          .modifyVars({
            '@primary-color': primaryColor
          })
          .then(() => {
            if (showMessage) {
              hideMessage()
            }
          })
          .catch(() => {
            if (showMessage) {
              hideMessage()
            }
          })
      },
      showMessage ? 200 : 0
    )
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode.setAttribute('href', '/color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `
    lessScriptNode.src =
      'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
    //  lessScriptNode.src =
    //    'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildTheme()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    buildTheme()
  }
}

export function Initializer(showMessage): void {
  updateTheme(
    showMessage,
    Vue.ls.get(types.DEFAULT_PRIMARY_COLOR, config.primaryColor)
  )
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
