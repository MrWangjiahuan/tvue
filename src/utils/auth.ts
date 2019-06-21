import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { UserModule } from '@/store/modules/user'

export function getToken() {
  return Cookies.get(ACCESS_TOKEN) || ''
}

export function setToken(token: string) {
  return Cookies.set(ACCESS_TOKEN, token)
}

export function removeToken() {
  return Cookies.remove(ACCESS_TOKEN)
}

export function check(authority): boolean {
  const current = UserModule.authority
  return current.some(item => authority.includes(item))
}

export function isLogin(): boolean {
  return getToken() === '' ? false : true
}
