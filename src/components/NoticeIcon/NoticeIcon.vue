<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import HeaderDropdown from '../HeaderDropdown/'
import NoticeList from './NoticeList.vue'
import {
  getOptionProps,
  filterEmpty
} from 'ant-design-vue/lib/_util/props-util'
import _map from 'lodash/map'

const prefixCls = 'notice-icon'

@Component({
  components: {
    HeaderDropdown,
    NoticeList
  }
})
export default class NoticeIcon extends Vue {
  @Prop({ default: 0 }) public count!: number
  @Prop({ default: '' }) public className!: string
  @Prop({ default: true }) public popupVisible!: boolean
  @Prop({ default: true }) public loading!: boolean
  @Prop({ default: '' }) public clearText!: string
  @Prop({ default: '' }) public viewMoreText!: string
  @Prop({ default: false }) public clearClose!: boolean

  public visible: boolean = false
  public emptyImage: string =
    'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'

  public handleVisibleChange(visible) {
    this.visible = visible
  }

  public handleTabChange(tabType) {
    this.$emit('tabChange', tabType)
  }

  public getNotificationBox(h) {
    const { loading, clearText, viewMoreText } = this
    const children = filterEmpty(this.$slots.default)
    if (!children) {
      return null
    }
    const panes = _map(children, child => {
      const childProps = getOptionProps(child)
      const {
        list,
        title,
        count,
        tabKey,
        showClear,
        emptyText,
        showViewMore
      } = childProps
      const len = list && list.length ? list.length : 0
      const msgCount = count || count === 0 ? count : len
      const tabTitle = msgCount > 0 ? `${title} (${msgCount})` : title
      const props = {
        clearText,
        emptyText,
        viewMoreText,
        showClear,
        showViewMore,
        title,
        onClick: item => this.$emit('itemClick', item, childProps),
        onClear: () => this.$emit('clear', title, tabKey),
        onViewMore: event => this.$emit('viewMore', childProps, event)
      }
      return (
        <a-tab-pane tab={tabTitle} key={tabKey}>
          <notice-list data={list} {...{ props }} />
        </a-tab-pane>
      )
    })
    return (
      <div>
        <a-spin spinning={loading} delay={0}>
          <a-tabs class={`${prefixCls}__tabs`} onChange={this.handleTabChange}>
            {panes}
          </a-tabs>
        </a-spin>
      </div>
    )
  }
  private render(h: CreateElement) {
    const { className, count, visible, popupVisible } = this
    const noticeButtonClass = {
      [className]: !!className,
      opened: !!visible,
      [`${prefixCls}__notice-button`]: true
    }
    const notificationBox = this.getNotificationBox(h)
    const NoticeBellIcon = <a-icon type="bell" class={`${prefixCls}__icon`} />
    const trigger = (
      <span class={noticeButtonClass}>
        <a-badge
          count={count}
          style={{ boxShadow: 'none' }}
          class={`${prefixCls}__badge`}
        >
          {NoticeBellIcon}
        </a-badge>
      </span>
    )
    if (!notificationBox) {
      return trigger
    }
    const popoverProps: any = {}
    if ('popupVisible' in this) {
      popoverProps.visible = popupVisible
    }
    return (
      <header-dropdown
        placement="bottomRight"
        overlayClassName={`${prefixCls}__popover`}
        trigger={['click']}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        overlay={notificationBox}
        {...popoverProps}
      >
        {trigger}
      </header-dropdown>
    )
  }
}
</script>

<style lang="less" src="./NoticeIcon.less"></style>
