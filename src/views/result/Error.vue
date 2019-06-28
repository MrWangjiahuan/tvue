<template>
  <a-card :bordered="false" style="margin: -24px -24px 0px;">
    <result
      type="error"
      :title="$t('result')['error.title']"
      :description="$t('result')['error.description']"
    >
      <template slot="action">
        <a-button type="primary">{{ $t('result')['error.btn-text'] }}</a-button>
      </template>
      <div>
        <div
          style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 16px"
        >
          {{ $t('result')['error.hint-title'] }}
        </div>
        <div style="margin-bottom: 16px">
          <a-icon
            type="close-circle-o"
            style="color: #f5222d; margin-right: 8px"
          />
          {{ $t('result')['error.hint-text1'] }}
          <a style="margin-left: 16px">
            {{ $t('result')['error.hint-btn1'] }}
            <a-icon type="right" />
          </a>
        </div>
        <div>
          <a-icon
            type="close-circle-o"
            style="color: #f5222d; margin-right: 8px"
          />
          {{ $t('result')['error.hint-text2'] }}
          <a style="margin-left: 16px">
            {{ $t('result')['error.hint-btn2'] }}
            <a-icon type="right" />
          </a>
        </div>
      </div>
    </result>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Result } from '@/components/'
@Component({
  components: { Result }
})
export default class Error extends Vue {
  private title: string = '提交失败'
  private description: string = '请核对并修改以下信息后，再重新提交。'
}
</script>
