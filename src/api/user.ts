import request from '@/utils/request'

export const getUser = () => {
  return request({
    url: '/user/login',
    method: 'get'
  })
}
