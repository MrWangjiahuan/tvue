import Vue from 'vue'
import * as types from '@/store/mutation-types'
import config from '@/config/defaultSettings'
import enUS from '@/locale/enUS'
import zhCN from '@/locale/zhCN'

export async function handleException(res) {
  return new Promise(async (resolve, reject) => {
    Vue.prototype.$message({
      message: '未知的error_code',
      type: 'error'
    })
    reject(res)
  })
}

export function handleError(error) {
  // 处理 network fail 异常
  const lan = Vue.ls.get(types.DEFAULT_LANGUAGE, config.language)
  if (!error.response) {
    Vue.prototype.$notify.error({
      message: lan === 'enUS' ? enUS.http.networkError : zhCN.http.networkError,
      description:
        lan === 'enUS' ? enUS.http.networkErrorDesc : zhCN.http.networkErrorDesc
    })
    console.log('error', error)
  }

  // 判断请求超时
  if (
    error.code === 'ECONNABORTED' &&
    error.message.indexOf('timeout') !== -1
  ) {
    console.log(Vue)
    Vue.prototype.$notify.error({
      message: lan === 'enUS' ? enUS.http.timeoutError : zhCN.http.timeoutError,
      description:
        lan === 'enUS' ? enUS.http.timeoutErrorDesc : zhCN.http.timeoutErrorDesc
    })
  }
  throw new Error(error)
}
