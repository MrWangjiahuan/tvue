<template>
  <div class="main user-layout-register">
    <h3>
      <span>{{ $t(`user['register.register']`) }}</span>
    </h3>
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t(`user['register.email']`)"
          v-decorator="[
            'email',
            {
              rules: [
                {
                  required: true,
                  type: 'email',
                  message: $t(`user['validation.email.wrong-format']`)
                }
              ],
              validateTrigger: ['change', 'blur']
            }
          ]"
        ></a-input>
      </a-form-item>

      <a-popover
        placement="rightTop"
        trigger="click"
        :visible="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              <span>{{ $t(`${passwordLevelName}`) }}</span>
            </div>
            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor="passwordLevelColor"
            />
            <div style="margin-top: 10px;">
              <span>{{ $t(`user['validation.password.strength.msg']`) }}</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input
            size="large"
            type="password"
            @click="handlePasswordInputClick"
            autocomplete="false"
            :placeholder="$t(`user['login.password']`)"
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    validator: handlePasswordLevel,
                    mess: $t(`user['validation.password.required']`),
                    mess1: $t(`user['validation.password.strength']`)
                  }
                ],
                validateTrigger: ['change', 'blur']
              }
            ]"
          ></a-input>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          :placeholder="$t(`user['login.confirm-password']`)"
          v-decorator="[
            'password2',
            {
              rules: [
                {
                  validator: handlePasswordCheck,
                  mess: $t(`user['validation.confirm-password.required']`),
                  mess1: $t(`user['validation.password.twice']`)
                }
              ],
              validateTrigger: ['change', 'blur']
            }
          ]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
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
              validateTrigger: ['change', 'blur']
            }
          ]"
        >
          <a-select slot="addonBefore" size="large" defaultValue="+86">
            <a-select-option value="+86">+86</a-select-option>
            <a-select-option value="+87">+87</a-select-option>
          </a-select>
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
            size="large"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="
              (!state.smsSendBtn &&
                $t(`user['register.get-verification-code']`)) ||
                state.time + ' s'
            "
          ></a-button>
        </a-col>
      </a-row>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
          >{{ $t(`user['register.register']`) }}</a-button
        >
        <router-link class="login" :to="{ name: 'login' }">{{
          $t(`user['register.sign-in']`)
        }}</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator'
import { DeviceMixin } from '@/utils/mixins'
import { getSmsCaptcha } from '@/api/user'
import { RESULT_CODE } from '@/config/constant'

const levelNames = {
  0: 'user.week',
  1: 'user.week',
  2: 'user.medium',
  3: 'user.strong'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}

@Component
export default class Register extends Mixins(DeviceMixin) {
  private form: any
  private registerBtn: boolean = false
  private state: any = {
    time: 60,
    smsSendBtn: false,
    passwordLevel: 0,
    passwordLevelChecked: false,
    percent: 10,
    progressColor: '#FF0000'
  }
  private created() {
    this.form = this.$form.createForm(this)
  }
  get passwordLevelClass(): string {
    return levelClass[this.state.passwordLevel]
  }
  get passwordLevelName(): string {
    return levelNames[this.state.passwordLevel]
  }
  get passwordLevelColor(): string {
    return levelColor[this.state.passwordLevel]
  }

  private handlePasswordLevel(rule, value, callback) {
    if (value === '') {
      callback(new Error(rule.mess))
    }
    let level = 0

    // 判断这个字符串中有没有数字
    if (/[0-9]/.test(value)) {
      level++
    }
    // 判断字符串中有没有字母
    if (/[a-zA-Z]/.test(value)) {
      level++
    }
    // 判断字符串中有没有特殊符号
    if (/[^0-9a-zA-Z_]/.test(value)) {
      level++
    }
    this.state.passwordLevel = level
    this.state.percent = level * 30
    if (level >= 2) {
      if (level >= 3) {
        this.state.percent = 100
      }
      callback()
    } else {
      if (level === 0) {
        this.state.percent = 10
      }
      callback(new Error(rule.mess1))
    }
  }
  private handlePasswordCheck(rule, value, callback) {
    const password = this.form.getFieldValue('password')
    if (password !== undefined && value === '') {
      callback(new Error(rule.mess))
    }
    if (value && password && value.trim() !== password.trim()) {
      callback(new Error(rule.mess1))
    }
    callback()
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
  private handlePasswordInputClick() {
    if (!this.isMobile()) {
      this.state.passwordLevelChecked = true
      return
    }
    this.state.passwordLevelChecked = false
  }

  private handleSubmit() {
    const {
      form: { validateFields },
      $router
    } = this
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        $router.push({ name: 'registerResult', params: { ...values } })
      }
    })
  }
  private getCaptcha(e) {
    e.preventDefault()
    const {
      form: { validateFields },
      state,
      $message,
      $notification
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
              mess = '验证码获取成功，您的验证码为：' + captcha
            } else {
              mess = '验证码获取失败'
            }
            this.$notification['success']({
              message: '提示',
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
}
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
