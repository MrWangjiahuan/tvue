<template>
  <result
    :title="$t(`user['register-result.msg']`, { email: email })"
    :description="$t(`user['register-result.activation-email']`)"
  >
    <template slot="action">
      <a-button size="large" type="primary">{{
        $t(`user['register-result.view-mailbox']`)
      }}</a-button>
      <a-button size="large" style="margin-left: 8px" @click="goHome">{{
        $t(`user['register-result.back-login']`)
      }}</a-button>
    </template>
  </result>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Result } from '@/components/'

@Component({
  components: {
    Result
  }
})
export default class RegisterResult extends Vue {
  private form: any = {}

  private created() {
    this.form = this.$route.params
  }

  get email(): string {
    const title = (this.form && this.form.email) || 'xxx'
    return title
  }

  private goHome() {
    this.$router.push({ name: 'login' })
  }
}
</script>
<style lang="less" scoped></style>
