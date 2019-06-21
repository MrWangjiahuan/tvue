import Vue from 'vue'
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
  MutationAction
} from 'vuex-module-decorators'
import store from '@/store'
import { loginByUserName, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export interface IUserState {
  token: string
  name: string
  avatar: string
  authority: any
  userInfo: object
}

interface IUserInfo {
  userName: string
  password: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken()
  public name = ''
  public avatar = ''
  public authority = []
  public userInfo = {}

  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  public SET_AUTHORITY(authority) {
    this.authority = authority
  }

  @Mutation
  public SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  public SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  public SET_USER_INFO(userInfo: object) {
    this.userInfo = userInfo
  }

  @Action
  public LoginByUserName(userInfo: IUserInfo) {
    const { userName, password } = userInfo
    return new Promise(resolve => {
      return loginByUserName({
        userName: userName.trim(),
        password: password
      }).then(response => {
        try {
          const { data } = response
          setToken(data.token)
          this.context.commit('SET_TOKEN', data.token)
          resolve(data)
        } catch (error) {
          Vue.prototype.$notification['error']({
            message: 'Tips',
            description: 'Login Failure',
            duration: 2
          })
          throw new Error(error)
        }
      })
    })
  }

  @Action
  public Logout() {
    return new Promise(resolve => {
      logout().then(response => {
        this.ResetToken()
        resolve(response.data)
      })
    })
  }

  // remove token
  @Action
  public ResetToken() {
    const { commit } = this.context
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_AUTHORITY', [])
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_USER_INFO', {})
      removeToken()
      resolve()
    })
  }

  @Action
  public GetUserInfo() {
    const { commit } = this.context
    return new Promise(resolve => {
      return getUserInfo(this.token).then(response => {
        const { data } = response.data

        if (!data) {
          const message = 'Verification failed, please Login again.'
          Vue.prototype.$notification['error']({
            message: 'Tips',
            description: message,
            duration: 2
          })
          throw new Error(message)
        }

        const { authority, name, avatar } = data
        if (!authority || authority.length <= 0) {
          const message = 'getUserInfo: authority must be a non-null array!'
          Vue.prototype.$notification['error']({
            message: 'Tips',
            description: message,
            duration: 2
          })
          throw new Error(message)
        }
        commit('SET_AUTHORITY', authority)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_USER_INFO', data)
        resolve(data)
      })
    })
  }
}

export const UserModule = getModule(User)
