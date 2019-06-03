import Mock from 'mockjs'
export default [
  // user login
  {
    url: '/user/login',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: ['ssssaaaassswwaaaaa', 'ssss']
      }
    }
  },
  {
    url: '/user/getSmsCaptcha',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        captcha: Mock.mock('@integer(10000, 99999)')
      }
    }
  }
]
