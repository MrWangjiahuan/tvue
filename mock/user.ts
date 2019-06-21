import Mock from 'mockjs'

const usernames = ['admin', 'user']
const passwords = [
  '21232f297a57a5a743894a0e4a801fc3',
  '8914de686ab28dc22f30d3d8e107ff6c'
] // admin, ant.design

const tokens = [
  '4291d7da9005377ec9aec4a71ea837f',
  '4291d7da9005377ec9aec4a71ea837e'
] // admin, user

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { userName, password } = config.body
      let code = 20000
      let message = ''
      let token = ''
      if (!usernames.includes(userName)) {
        code = 20003
        message = 'ERROR Incorrect username or password'
      } else {
        if (password !== passwords[1]) {
          code = 20003
          message = 'ERROR Incorrect username or password'
        } else {
          code = 20000
          ;(message = 'Successful login'),
            (token = userName == 'admin' ? tokens[0] : tokens[1])
        }
      }
      return {
        code,
        message,
        token
      }
    }
  },
  {
    url: '/user/getUserInfo',
    type: 'get',
    response: config => {
      const { token } = config.query
      return {
        code: 20000,
        data: {
          id: Mock.mock('@guid'),
          name: Mock.mock('@name'),
          username: 'admin',
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
          status: 1,
          authority: token == tokens[0] ? ['admin', 'user'] : ['user'],
          telephone: '',
          lastLoginIp: '27.154.74.117',
          lastLoginTime: 1534837621348,
          creatorId: 'admin',
          createTime: 1497160610259,
          deleted: 0,
          roleId: 'admin',
          lang: 'zh-CN',
          token: token
        }
      }
    }
  },
  {
    url: '/user/logout',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        message: 'Successful cancellation'
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
