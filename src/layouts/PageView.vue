<template>
  <div
    :style="
      !$route.meta.hiddenHeaderContent ? 'margin: -24px -24px 0px;' : null
    "
  >
    <!-- pageHeader , route meta :true on hide -->
    <page-header
      v-if="!$route.meta.hiddenHeaderContent"
      :title="pageTitle"
      :logo="logo"
      :avatar="avatar"
    >
      <slot slot="action" name="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && description">
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ description }}</p>
        <div class="link">
          <template v-for="(link, index) in linkList">
            <a :key="index" :href="link.href">
              <a-icon :type="link.icon" />
              <span>{{ link.title }}</span>
            </a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra">
        <div class="extra-img">
          <img v-if="typeof extraImage !== 'undefined'" :src="extraImage" />
        </div>
      </slot>
      <div slot="pageMenu">
        <div class="page-menu-search" v-if="search">
          <a-input-search
            style="width: 80%; max-width: 522px;"
            placeholder="请输入..."
            size="large"
            enterButton="搜索"
          />
        </div>
        <div class="page-menu-tabs" v-if="tabs && tabs.items">
          <a-tabs
            :tabBarStyle="{ margin: 0 }"
            :activeKey="tabs.active()"
            @change="tabs.callback"
          >
            <a-tab-pane
              v-for="item in tabs.items"
              :tab="item.title"
              :key="item.key"
            ></a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </page-header>
    <div class="content">
      <div class="page-header-index-wide">
        <slot>
          <route-view ref="content" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { PageHeader } from '@/components/'
import RouteView from '@/layouts/RouteView.vue'

@Component({
  components: {
    PageHeader,
    RouteView
  }
})
export default class PageView extends Vue {
  @Prop({ default: true, required: false }) public title!: string | boolean
  @Prop({ default: '', required: false }) public logo!: string
  @Prop({ default: '', required: false }) public avatar!: string

  @Getter multiTab
  private pageTitle: string = ''
  private description: string = ''
  private linkList: any = []
  private extraImage: string = ''
  private search: boolean = false
  private tabs = {}

  private mounted() {
    this.getPageMeta()
  }
  private updated() {
    this.getPageMeta()
  }
  private getPageMeta() {
    this.pageTitle =
      typeof this.title === 'string' || !this.title
        ? this.title
        : this.$route.meta.title

    const content: any = this.$refs.content
    if (content) {
      if (content.pageMeta) {
        Object.assign(this, content.pageMeta)
      } else {
        this.description = content.description
        this.linkList = content.linkList
        this.extraImage = content.extraImage
        this.search = content.search === true
        this.tabs = content.tabs
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  margin: 24px 24px 0;
  .link {
    margin-top: 16px;
    &:not(:empty) {
      margin-bottom: 16px;
    }
    a {
      margin-right: 32px;
      height: 24px;
      line-height: 24px;
      display: inline-block;
      i {
        font-size: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }
      span {
        height: 24px;
        line-height: 24px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
.page-menu-search {
  text-align: center;
  margin-bottom: 16px;
}
.page-menu-tabs {
  margin-top: 48px;
}

.extra-img {
  margin-top: -60px;
  text-align: center;
  width: 195px;

  img {
    width: 100%;
  }
}

.mobile {
  .extra-img {
    margin-top: 0;
    text-align: center;
    width: 96px;

    img {
      width: 100%;
    }
  }
}
</style>
