<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

const prefixCls = 'notice-list'
const genCls = moduleName => `${prefixCls}__${moduleName}`

@Component
export default class NoticeList extends Vue {
  @Prop({ default: 0 }) public count!: number
  @Prop({ default: () => [] }) public list!: []
  @Prop({ default: () => [] }) public data!: []
  @Prop({ default: '' }) public title!: string
  @Prop({ default: '' }) public tabKey!: string
  @Prop({ default: true }) public showClear!: boolean
  @Prop({ default: false }) public showViewMore!: boolean
  @Prop({ default: '' }) public emptyText!: string
  @Prop({ default: '' }) public clearText!: string
  @Prop({ default: '' }) public viewMoreText!: string
  @Prop({ default: () => null }) public onViewMore!: Function
  @Prop({ default: () => null }) public onClick!: Function
  @Prop({ default: () => null }) public onClear!: Function

  private render(h: CreateElement) {
    const {
      title,
      data,
      emptyText,
      clearText,
      showClear,
      showViewMore,
      viewMoreText,
      onClick,
      onClear,
      onViewMore
    } = this
    if (data.length === 0) {
      return (
        <div class={genCls('not-found')}>
          <img
            src={`https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg`}
            alt={`not found`}
          />
          <div>{emptyText}</div>
        </div>
      )
    }
    return (
      <div>
        <a-list
          class={genCls('list')}
          dataSource={data}
          renderItem={(item, i) => {
            const itemCls = {
              [genCls('list-item')]: true,
              [genCls('list-read')]: !!item.read
            }
            const leftIcon = item.avatar ? (
              typeof item.avatar === 'string' ? (
                <a-avatar
                  class={genCls('list-item__avatar')}
                  src={item.avatar}
                />
              ) : (
                <span class={genCls('list-item__icon-element')}>
                  {item.avatar}
                </span>
              )
            ) : (
              ''
            )
            let extra = item.extra
            if (item.extra && item.status) {
              const color = {
                todo: '',
                processing: 'blue',
                urgent: 'red',
                doing: 'gold'
              }[item.status]
              extra = item.extra ? (
                typeof item.extra === 'string' ? (
                  <a-tag color={color} style={{ marginRight: 0 }}>
                    {item.extra}
                  </a-tag>
                ) : (
                  item.extra
                )
              ) : (
                ''
              )
            }
            return (
              <a-list-item
                class={itemCls}
                key={item.key || i}
                onClick={() => onClick && onClick(item)}
              >
                <a-list-item-meta
                  class={genCls('list-item__meta')}
                  avatar={leftIcon}
                  title={
                    <div class={genCls('list-item__title')}>
                      {item.title}
                      <div class={genCls('list-item__extra')}>{extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div class={genCls('list-item__description')}>
                        {item.description}
                      </div>
                      <div class={genCls('list-item__datetime')}>
                        {item.datetime}
                      </div>
                    </div>
                  }
                />
              </a-list-item>
            )
          }}
        />
        <div class={genCls('bottom-bar')}>
          {showClear ? (
            <div onClick={onClear}>
              {clearText} {title}
            </div>
          ) : (
            ''
          )}
          {showViewMore ? (
            <div onClick={e => onViewMore && onViewMore(e)}>{viewMoreText}</div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" src="./NoticeList.less"></style>
