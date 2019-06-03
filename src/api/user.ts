import request from '@/utils/request'

export const getUser = () => {
  return request({
    url: '/user/login',
    method: 'get'
  })
}

export const getSmsCaptcha = () => {
  return request({
    url: '/user/getSmsCaptcha',
    method: 'get'
  })
}
