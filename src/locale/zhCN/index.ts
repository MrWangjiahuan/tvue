const globalHeader = {
  message: '正在编译语言！',
  themeMessage: '正在编译主题！',
  tips: '提示',
  logoutMess: '确认注销吗？'
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
  form: '表单页',
  basicForm: '基础表单',
  stepForm: '分步表单',
  exception: '异常页',
  exception_403: '403',
  exception_404: '404',
  exception_500: '500',
  result: '结果页',
  resultFail: '失败',
  resultSuccess: '成功',
  login: '登录',
  register: '注册'
}

const http = {
  networkError: '网络错误',
  networkErrorDesc: '请检查网络连接是否异常',
  timeoutError: '请求超时',
  timeoutErrorDesc: '请求已超时，请稍后重试'
}

const component = {
  'globalHeader.notification': '通知',
  'globalHeader.notification.empty': '您已查看所有通知',
  'globalHeader.message': '消息',
  'globalHeader.message.empty': '您已读完所有消息',
  'globalHeader.event': '待办',
  'globalHeader.event.empty': '您已完成所有待办',
  'noticeIcon.clear': '清空',
  'noticeIcon.cleared': '清空了',
  'noticeIcon.empty': '暂无数据',
  'noticeIcon.view-more': '查看更多'
}
const result = {
  'error.title': '提交失败',
  'error.description': '请核对并修改以下信息后，再重新提交。',
  'error.hint-title': '您提交的内容有如下错误：',
  'error.hint-text1': '您的账户已被冻结',
  'error.hint-btn1': '立即解冻',
  'error.hint-text2': '您的账户还不具备申请资格',
  'error.hint-btn2': '立即升级',
  'error.btn-text': '返回修改',
  'success.title': '提交成功',
  'success.description':
    '提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。',
  'success.operate-title': '项目名称',
  'success.operate-id': '项目 ID：',
  'success.principal': '负责人：',
  'success.operate-time': '生效时间：',
  'success.step1-title': '创建项目',
  'success.step1-operator': '曲丽丽',
  'success.step2-title': '部门初审',
  'success.step2-operator': '周毛毛',
  'success.step2-extra': '催一下',
  'success.step3-title': '财务复核',
  'success.step4-title': '完成',
  'success.btn-return': '返回列表',
  'success.btn-project': '查看项目',
  'success.btn-print': '打印'
}
const user = {
  'userLayout.help': '帮助',
  'userLayout.privacy': '隐私',
  'userLayout.terms': '条款',
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
  'register-result.back-login': '返回登录页',
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

export { globalHeader, settingDrawer, component, menu, http, user, result }
