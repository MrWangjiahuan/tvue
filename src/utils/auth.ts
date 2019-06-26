import Cookies from 'js-cookie'
import { ACCESS_TOKEN, AUTHORITY } from '@/store/mutation-types'
import Vue from 'vue'

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
  const current = Vue.ls.get(AUTHORITY, [])
  return current.some(item => authority.includes(item))
}

export function isLogin(): boolean {
  return getToken() === '' ? false : true
}
