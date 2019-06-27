<template>
  <notice-icon
    class="action"
    :count="unreadCount"
    :loading="fetchingNotices"
    :clearClose="true"
    :clearText="$t('component')['noticeIcon.clear']"
    :viewMoreText="$t('component')['noticeIcon.view-more']"
    @itemClick="handleItemClick"
    @clear="handleNoticeClear"
    @viewMore="handleViewMore"
  >
    <notice-icon-tab
      tabKey="notification"
      :count="unreadData.notification"
      :list="noticeData.notification"
      :title="$t('component')['globalHeader.notification']"
      :emptyText="$t('component')['globalHeader.notification.empty']"
      :showViewMore="true"
    ></notice-icon-tab>
    <notice-icon-tab
      tabKey="message"
      :count="unreadData.message"
      :list="noticeData.message"
      :title="$t('component')['globalHeader.message']"
      :emptyText="$t('component')['globalHeader.message.empty']"
      :showViewMore="true"
    ></notice-icon-tab>
    <notice-icon-tab
      tabKey="event"
      :count="unreadData.event"
      :list="noticeData.event"
      :title="$t('component')['globalHeader.event']"
      :emptyText="$t('component')['globalHeader.event.empty']"
      :showViewMore="true"
    ></notice-icon-tab>
  </notice-icon>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import _groupBy from 'lodash/groupBy'
import moment from 'moment'
import { NoticeIcon } from '@/components/'

@Component({
  components: {
    NoticeIcon,
    NoticeIconTab: NoticeIcon.Tab
  }
})
export default class NoticeIconView extends Vue {
  @Getter notices
  @Getter unreadCount
  @Getter fetchingNotices

  @Action('FetchNotices') fetchNotices
  @Action('ChangeNoticeReadState') changeNoticeReadState
  @Action('ClearNotices') clearNotices

  private mounted() {
    this.fetchNotices()
  }

  get noticeData() {
    const { notices = [] } = this
    if (notices.length === 0) {
      return {}
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice }
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow()
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id
      }
      return newNotice
    })
    return _groupBy(newNotices, 'type')
  }
  get unreadData() {
    const unreadMsg = {}
    Object.entries(this.noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length
      }
    })
    return unreadMsg
  }

  private handleItemClick(item) {
    this.changeNoticeReadState(item.id)
  }
  private handleNoticeClear(title, tabKey) {
    /* tslint:disable */
    this.$message.success(
      `${this.$t('component')['noticeIcon.cleared']} ${title}`
    )
    this.clearNotices(tabKey)
  }
  private handleViewMore() {
    console.log('handleViewMore')
  }
}
</script>
