export default [
  // user login
  {
    url: '/user/login',
    type: 'get',
    response: config => {
      console.log(config)
      return {
        code: 20000,
        data: ['ssssaaaassswwaaaaa', 'ssss']
      }
    }
  }
]
