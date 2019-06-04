import { Vue, Component, Mixins } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { DeviceMixin } from '@/utils/mixins'
import Utils from '@/utils/util'
import findLast from 'lodash/findLast'
import throttle from 'lodash/throttle'

@Component
class HeaderLayoutMixin extends Mixins(DeviceMixin) {
  public clientWidth: number = 0

  @Getter language

  @Action('ToggleLanguage') toggleLanguage

  // 如果为手机端下拉菜单则为屏幕宽度
  get contentWith(): string {
    return this.isMobile() ? `width:${this.clientWidth}px;` : ''
  }

  public mounted() {
    this.clientWidth = window.innerWidth
    // mobile 取outerWidth
    window.onresize = throttle(() => {
      this.clientWidth = window.outerWidth
    }, 1000)
  }

  public localeChange() {
    return this.$message
      .loading(this.$t('globalHeader.message'), 1)
      .then(async () => {
        this.$i18n.locale = this.language === 'enUS' ? 'zhCN' : 'enUS'
        await this.toggleLanguage(this.language === 'enUS' ? 'zhCN' : 'enUS')
        const record = findLast(
          this.$route.matched,
          record => record.meta.title
        )
        record.meta.localeTitle = this.$t(`menu.${record.meta.title}`)
        let title: string
        if (record) {
          title = `${record.meta.localeTitle} - Ant Design Pro`
        } else {
          title = 'Ant Design Pro'
        }
        Utils.setDocumentTitle(title)
      })
  }
}

export { HeaderLayoutMixin }
