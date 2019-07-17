import request from '@/utils/request'

export const getUser = () => {
  return request({
    url: '/user/login/s',
    method: 'GET'
  })
}

export const loginByUserName = data => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'POST'
  })
}

export const getUserInfo = token => {
  return request({
    url: '/user/getUserInfo',
    method: 'GET',
    params: { token }
  })
}

export const getSmsCaptcha = () => {
  return request({
    url: '/user/getSmsCaptcha',
    method: 'GET'
  })
}

export const getNotices = () => {
  return request({
    url: '/user/getNotices',
    method: 'GET'
  })
}
