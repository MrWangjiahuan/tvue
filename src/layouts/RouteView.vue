<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component
export default class RouteView extends Vue {
  @Prop({ default: true }) public keepAlive!: boolean

  private render(h: CreateElement) {
    const {
      $route: { meta }
    } = this
    const inKeep = (
      <keep-alive>
        <router-view />
      </keep-alive>
    )
    const notKeep = <router-view />
    // 这里增加了 multiTab 的判断，当开启了 multiTab 时
    // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
    // 若确实不需要，可改为 return meta.keepAlive ? inKeep : notKeep
    if (meta.keepAlive === false) {
      return notKeep
    }
    return this.keepAlive || meta.keepAlive ? inKeep : notKeep
  }
}
</script>
