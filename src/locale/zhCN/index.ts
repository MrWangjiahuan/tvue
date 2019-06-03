const globalHeader = {
  message: '正在编译语言！',
  themeMessage: '正在编译主题！'
}
const settingDrawer = {
  pageStyleTitle: '整体风格设置',
  dartTooltipTitle: '暗色菜单风格',
  lightTooltipTitle: '亮色菜单风格',
  themeTitle: '主题色',
  layoutTitle: '导航模式',
  sideMenuTitle: '侧边菜单布局',
  topMenuTitle: '顶部菜单布局',
  dustRed: '薄暮',
  volcano: '火山',
  sunsetOrange: '日暮',
  cyan: '明青',
  polarGreen: '极光绿',
  daybreakBlue: '拂晓蓝（默认）',
  geekBlue: '极客蓝',
  goldenPurple: '酱紫'
}
const menu = {
  dashboard: '仪表盘',
  analysis: '分析页',
  form: '表单',
  basicForm: '基础表单',
  stepForm: '分步表单',
  login: '登录',
  register: '注册'
}

const http = {
  networkError: '网络错误',
  networkErrorDesc: '请检查网络连接是否异常',
  timeoutError: '请求超时',
  timeoutErrorDesc: '请求已超时，请稍后重试'
}

const user = {
  'login.userName': '用户名',
  'login.password': '密码',
  'login.phone': '手机号',
  'login.verification-code': '验证码',
  'login.confirm-password': '确认密码',
  'login.message-invalid-credentials': '账户或密码错误（admin/ant.design）',
  'login.message-invalid-verification-code': '验证码错误',
  'login.tab-login-credentials': '账户密码登录',
  'login.tab-login-mobile': '手机号登录',
  'login.remember-me': '自动登录',
  'login.forgot-password': '忘记密码',
  'login.sign-in-with': '其他登录方式',
  'login.signup': '注册账户',
  'login.login': '登录',
  'register.register': '注册',
  'register.email': '邮箱',
  'register.get-verification-code': '获取验证码',
  'login.verification-code-warning':
    '此项目为演示项目，并不会真的给您发送验证码。请切换到账户密码登录界面按提示登录。',
  'register.sign-in': '使用已有账户登录',
  'register-result.msg': '你的账户：{email} 注册成功',
  'register-result.activation-email':
    '激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。',
  'register-result.back-home': '返回首页',
  'register-result.view-mailbox': '查看邮箱',
  'validation.email.required': '请输入邮箱地址！',
  'validation.email.wrong-format': '邮箱地址格式错误！',
  'validation.userName.required': '请输入用户名!',
  'validation.password.required': '请输入密码！',
  'validation.password.twice': '两次输入的密码不匹配!',
  'validation.password.strength.msg':
    '请至少输入 6 个字符。请不要使用容易被猜到的密码。',
  'validation.password.strength': '密码强度不够！',
  strong: '强度：强',
  medium: '强度：中',
  week: '强度：弱',
  'validation.confirm-password.required': '请确认密码！',
  'validation.phone-number.required': '请输入手机号！',
  'validation.phone-number.wrong-format': '手机号格式错误！',
  'validation.verification-code.required': '请输入验证码！',
  'validation.title.required': '请输入标题',
  'validation.date.required': '请选择起止日期',
  'validation.goal.required': '请输入目标描述',
  'validation.standard.required': '请输入衡量标准'
}

export { globalHeader, settingDrawer, menu, http, user }
