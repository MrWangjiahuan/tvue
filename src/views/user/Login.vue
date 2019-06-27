<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="activeKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane
          key="credentials"
          :tab="$t(`user['login.tab-login-credentials']`)"
        >
          <a-form-item>
            <a-input
              size="large"
              type="text"
              :placeholder="`${$t(`user['login.userName']`)}: admin or user`"
              v-decorator="[
                'userName',
                {
                  rules: [
                    {
                      required: true,
                      message: $t(`user['validation.userName.required']`)
                    },
                    { validator: handleuserNameOrEmail }
                  ],
                  validateTrigger: 'change'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color:rgba(0,0,0,.25);"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              :placeholder="`${$t(`user['login.password']`)}: ant.design`"
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: $t(`user['validation.password.required']`)
                    }
                  ],
                  validateTrigger: 'blur'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color:rgba(0,0,0,.25);"
              />
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane
          key="mobileNumber"
          :tab="$t(`user['login.tab-login-mobile']`)"
        >
          <a-form-item>
            <a-input
              size="large"
              type="text"
              :placeholder="$t(`user['login.phone']`)"
              v-decorator="[
                'mobile',
                {
                  rules: [
                    {
                      validator: handlePhoneCheck,
                      mess: $t(`user['validation.phone-number.required']`),
                      mess1: $t(`user['validation.phone-number.wrong-format']`)
                    }
                  ],
                  validateTrigger: 'blur'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="mobile"
                style="color:rgba(0,0,0,.25);"
              />
            </a-input>
          </a-form-item>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  :placeholder="$t(`user['login.verification-code']`)"
                  v-decorator="[
                    'captcha',
                    {
                      rules: [
                        {
                          required: true,
                          message: $t(
                            `user['validation.verification-code.required']`
                          )
                        }
                      ],
                      validateTrigger: 'blur'
                    }
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    style="color:rgba(0,0,0,.25);"
                  />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="
                  (!state.smsSendBtn &&
                    $t(`user['register.get-verification-code']`)) ||
                    state.time + ' s'
                "
              />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">{{
          $t(`user['login.remember-me']`)
        }}</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa' } }"
          class="forge-password"
          style="float: right;"
          >{{ $t(`user['login.forgot-password']`) }}</router-link
        >
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          >{{ $t(`user['login.login']`) }}</a-button
        >
      </a-form-item>

      <div class="user-login-other">
        <span>{{ $t(`user['login.sign-in-with']`) }}</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'register' }">{{
          $t(`user['login.signup']`)
        }}</router-link>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import md5 from 'md5'
import { getSmsCaptcha } from '@/api/user'
import { RESULT_CODE } from '@/config/constant'
import Utils from '@/utils/util'
import { UserModule } from '@/store/modules/user'

@Component
export default class Login extends Vue {
  private form: any
  private activeKey: string = 'credentials'
  private state = {
    time: 60,
    loginBtn: false,
    // login type: 0 email, 1 userName, 2 telephone
    loginType: 0,
    smsSendBtn: false
  }

  @Action('GetUserInfo') getUserInfo
  @Action('FetchNotices') fetchNotices

  private created() {
    this.form = this.$form.createForm(this)
    this.fetchNotices()
  }
  private handleSubmit(e) {
    e.preventDefault()
    const {
      form: { validateFields },
      state,
      activeKey
    } = this
    state.loginBtn = true
    const validateFieldsKey: string[] =
      activeKey === 'credentials'
        ? ['userName', 'password']
        : ['mobile', 'captcha']
    validateFields(validateFieldsKey, { force: true }, (err, values) => {
      if (!err) {
        if (activeKey !== 'credentials') {
          this.$notification['warning']({
            message:
              'Mobile login is for demonstration only. Please login with username and password.',
            description: '',
            duration: 5
          })
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
          return
        }
        const loginParams = { ...values }
        delete loginParams.userName
        loginParams[!state.loginType ? 'email' : 'userName'] = values.userName
        loginParams.password = md5(values.password)
        return UserModule.LoginByUserName(loginParams)
          .then(res => {
            const { code, message } = res as any
            console.log(res)
            if (code === RESULT_CODE.USER_ACCOUNT_ERROR) {
              this.$notification['error']({
                message: 'Login Failure',
                description: message,
                duration: 2
              })
            } else {
              this.getUserInfo().then(() => {
                this.loginSuccess()
              })
            }
          })
          .finally(() => {
            state.loginBtn = false
          })
      } else {
        setTimeout(() => {
          state.loginBtn = false
        }, 600)
      }
    })
  }
  private loginSuccess() {
    this.$router.push({ path: '/' })
    // 延迟 1 秒显示欢迎信息
    setTimeout(() => {
      this.$notification.success({
        message: 'Welcome',
        description: `${Utils.timeFix()}，Welcome back`
      })
    }, 1000)
  }
  private handleTabClick(key: string) {
    this.activeKey = key
  }
  private handlePhoneCheck(rule, value, callback) {
    if (value === '' || value === undefined) {
      callback(new Error(rule.mess))
    }
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error(rule.mess1))
    }
    callback()
  }
  private getCaptcha(e) {
    e.preventDefault()
    const {
      form: { validateFields },
      state
    } = this
    validateFields(['mobile'], { force: true }, (err, values) => {
      if (!err) {
        state.smsSendBtn = true

        const interval = window.setInterval(() => {
          if (state.time-- <= 0) {
            state.time = 60
            state.smsSendBtn = false
            window.clearInterval(interval)
          }
        }, 1000)
        getSmsCaptcha()
          .then(res => {
            const { code, captcha } = res.data
            let mess: string = ''
            if (code === RESULT_CODE.SUCCESS) {
              mess =
                'Verification code is successful, your verification code is  ' +
                captcha
            } else {
              mess = 'Verification code acquisition failure'
            }
            this.$notification['success']({
              message: 'Tips',
              description: mess,
              duration: 8
            })
          })
          .catch(() => {
            clearInterval(interval)
            state.time = 60
            state.smsSendBtn = false
          })
      }
    })
  }
  private handleuserNameOrEmail(rule, value, callback) {
    const { state } = this
    const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
    if (regex.test(value)) {
      state.loginType = 0
    } else {
      state.loginType = 1
    }
    callback()
  }
}
</script>
<style lang="less" src="./less/login.less" />
