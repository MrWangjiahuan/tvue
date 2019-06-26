const globalHeader = {
  message: 'Compiling Language !',
  themeMessage: 'Compiling theme !',
  tips: 'Tips',
  logoutMess: 'Do you really want to log out?'
}
const settingDrawer = {
  pageStyleTitle: 'Page style setting',
  dartTooltipTitle: 'Dark style',
  lightTooltipTitle: 'Light style',
  themeTitle: 'Theme Color',
  layoutTitle: 'Navigation Mode',
  sideMenuTitle: 'Side Menu Layout',
  topMenuTitle: 'Top Menu Layout',
  dustRed: 'Dust Red',
  volcano: 'Volcano',
  sunsetOrange: 'Sunset Orange',
  cyan: 'Cyan',
  polarGreen: 'Polar Green',
  daybreakBlue: 'Daybreak Blue (default)',
  geekBlue: 'Geek Blue',
  goldenPurple: 'Golden Purple'
}
const menu = {
  dashboard: 'Dashboard',
  analysis: 'Analysis',
  form: 'Form',
  basicForm: 'Basic Form',
  stepForm: 'Step Form',
  login: 'Login',
  register: 'Register'
}

const http = {
  networkError: 'Network Error',
  networkErrorDesc: 'Check if the network connection is abnormal',
  timeoutError: 'Timeout Error',
  timeoutErrorDesc: 'The request has timed out. Please try again later'
}

const component = {
  'globalHeader.notification': 'Notification',
  'globalHeader.notification.empty': 'You have viewed all notifications.',
  'globalHeader.message': 'Message',
  'globalHeader.message.empty': 'You have viewed all messages.',
  'globalHeader.event': 'Event',
  'globalHeader.event.empty': 'You have viewed all events',
  'noticeIcon.clear': 'Clear',
  'noticeIcon.cleared': 'Cleared',
  'noticeIcon.empty': 'No notifications',
  'noticeIcon.view-more': 'View more'
}

const user = {
  'userLayout.help': 'Help',
  'userLayout.privacy': 'Privacy',
  'userLayout.terms': 'Terms',
  'login.userName': 'UserName',
  'login.password': 'Password',
  'login.phone': 'Phone Number',
  'login.verification-code': 'Verification Code',
  'login.confirm-password': 'Confirm password',
  'login.message-invalid-credentials':
    'Invalid username or password（admin/ant.design）',
  'login.message-invalid-verification-code': 'Invalid verification code',
  'login.tab-login-credentials': 'Credentials',
  'login.tab-login-mobile': 'Mobile number',
  'login.remember-me': 'Remember me',
  'login.forgot-password': 'Forgot your password?',
  'login.sign-in-with': 'Sign in with',
  'login.signup': 'Sign up',
  'login.login': 'Login',
  'register.register': 'Register',
  'register.email': 'Email',
  'register.get-verification-code': 'Get code',
  'login.verification-code-warning':
    'This project is a demo project and will not actually send you a verification code. Please switch to the account password login interface and log in as prompted.',
  'register.sign-in': 'Already have an account?',
  'register-result.msg': 'Account：registered at {email}',
  'register-result.activation-email':
    'The activation email has been sent to your email address and is valid for 24 hours. Please log in to the email in time and click on the link in the email to activate the account.',
  'register-result.back-login': 'Back to login',
  'register-result.view-mailbox': 'View mailbox',
  'validation.email.required': 'Please enter your email!',
  'validation.email.wrong-format': 'The email address is in the wrong format!',
  'validation.userName.required': 'Please enter your userName!',
  'validation.password.required': 'Please enter your password!',
  'validation.password.twice': 'The passwords entered twice do not match!',
  'validation.password.strength.msg': `Please enter at least 6 characters and don't use passwords that are easy to guess.`,
  'validation.password.strength': 'Password strength is insufficient.',
  strong: 'Strength: strong',
  medium: 'Strength: medium',
  week: 'Strength: weak',
  'validation.confirm-password.required': 'Please confirm your password!',
  'validation.phone-number.required': 'Please enter your phone number!',
  'validation.phone-number.wrong-format': 'Malformed phone number!',
  'validation.verification-code.required':
    'Please enter the verification code!',
  'validation.title.required': 'Please enter a title',
  'validation.date.required': 'Please select the start and end date',
  'validation.goal.required': 'Please enter a description of the goal',
  'validation.standard.required': 'Please enter a metric'
}

export { globalHeader, settingDrawer, component, menu, http, user }
