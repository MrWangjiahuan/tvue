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
                'username',
                {
                  rules: [
                    {
                      required: true,
                      message: $t(`user['validation.userName.required']`)
                    },
                    { validator: handleUsernameOrEmail }
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
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: $t(
                        `user['validation.phone-number.wrong-format']`
                      )
                    }
                  ],
                  validateTrigger: 'change'
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
@Component
export default class Login extends Vue {
  private form: any
  private activeKey: string = 'credentials'
  private state = {
    time: 60,
    loginBtn: false,
    // login type: 0 email, 1 username, 2 telephone
    loginType: 0,
    smsSendBtn: false
  }

  private created() {
    this.form = this.$form.createForm(this)
  }
  private handleSubmit() {}
  private handleTabClick(key: string) {
    this.activeKey = key
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
        const hide = this.$message.loading('验证码发送中..', 0)
        // getSmsCaptcha({ mobile: values.mobile })
        //   .then(res => {
        //     setTimeout(hide, 2500)
        //     this.$notification['success']({
        //       message: '提示',
        //       description:
        //         '验证码获取成功，您的验证码为：' + res.result.captcha,
        //       duration: 8
        //     })
        //   })
        //   .catch(err => {
        //     setTimeout(hide, 1)
        //     clearInterval(interval)
        //     state.time = 60
        //     state.smsSendBtn = false
        //     this.requestFailed(err)
        //   })
      }
    })
  }
  private handleUsernameOrEmail(rule, value, callback) {
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
<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
  .forge-password {
    font-size: 14px;
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;
    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
    .register {
      float: right;
    }
  }
}
</style>
