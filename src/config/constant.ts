enum METHOD_TYPE {
  GET = 'Get',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

const RESULT_CODE = {
  // 成功状态码
  SUCCESS: 20000,

  // -------------------失败状态码----------------------
  // 参数错误
  PARAMS_IS_NULL: 10001, // 参数为空
  PARAMS_NOT_COMPLETE: 10002, // 参数不全
  PARAMS_TYPE_ERROR: 10003, // 参数类型错误
  PARAMS_IS_INVALID: 10004, // 参数无效

  // 用户错误
  USER_NOT_EXIST: 20001, // 用户不存在
  USER_NOT_LOGGED_IN: 20002, // 用户未登陆
  USER_ACCOUNT_ERROR: 20003, // 用户名或密码错误
  USER_ACCOUNT_FORBIDDEN: 20004, // 用户账户已被禁用
  USER_HAS_EXIST: 20005, // 用户已存在

  // 业务错误
  BUSINESS_ERROR: 30001, // 系统业务出现问题

  // 系统错误
  SYSTEM_INNER_ERROR: 40001, // 系统内部错误

  // 数据错误
  DATA_NOT_FOUND: 50001, // 数据未找到
  DATA_IS_WRONG: 50002, // 数据有误
  DATA_ALREADY_EXISTED: 50003, // 数据已存在

  // 接口错误
  INTERFACE_INNER_INVOKE_ERROR: 60001, // 系统内部接口调用异常
  INTERFACE_OUTER_INVOKE_ERROR: 60002, // 系统外部接口调用异常
  INTERFACE_FORBIDDEN: 60003, // 接口禁止访问
  INTERFACE_ADDRESS_INVALID: 60004, // 接口地址无效
  INTERFACE_REQUEST_TIMEOUT: 60005, // 接口请求超时
  INTERFACE_EXCEED_LOAD: 60006, // 接口负载过高

  // 权限错误
  PERMISSION_NO_ACCESS: 70001 // 没有访问权限
}

export { METHOD_TYPE, RESULT_CODE }
