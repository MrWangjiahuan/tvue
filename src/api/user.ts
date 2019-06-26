import request from '@/utils/request'
import { METHOD_TYPE } from '@/config/constant'

export const getUser = () => {
  return request({
    url: '/user/login/s',
    method: METHOD_TYPE.GET
  })
}

export const loginByUserName = data => {
  return request({
    url: '/user/login',
    method: METHOD_TYPE.POST,
    data
  })
}

export const logout = () => {
  return request({
    url: '/user/logout',
    method: METHOD_TYPE.POST
  })
}

export const getUserInfo = token => {
  return request({
    url: '/user/getUserInfo',
    method: METHOD_TYPE.GET,
    params: { token }
  })
}

export const getSmsCaptcha = () => {
  return request({
    url: '/user/getSmsCaptcha',
    method: METHOD_TYPE.GET
  })
}

export const getNotices = () => {
  return request({
    url: '/user/getNotices',
    method: METHOD_TYPE.GET
  })
}
