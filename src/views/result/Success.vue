<template>
  <a-card :bordered="false" style="margin: -24px -24px 0px;">
    <result
      type="success"
      :description="$t('result')['success.description']"
      :title="$t('result')['success.title']"
    >
      <template slot="action">
        <a-button type="primary">{{
          $t('result')['success.btn-return']
        }}</a-button>
        <a-button style="margin-left: 8px">{{
          $t('result')['success.btn-project']
        }}</a-button>
        <a-button style="margin-left: 8px">{{
          $t('result')['success.btn-print']
        }}</a-button>
      </template>
      <div>
        <div
          style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 20px;"
        >
          {{ $t('result')['success.operate-title'] }}
        </div>
        <a-row style="margin-bottom: 16px">
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">{{
              $t('result')['success.operate-id']
            }}</span>
            20180724089
          </a-col>
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">{{
              $t('result')['success.principal']
            }}</span>
            曲丽丽是谁？
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <span style="color: rgba(0, 0, 0, 0.85)">{{
              $t('result')['success.operate-time']
            }}</span>
            2016-12-12 ~ 2017-12-12
          </a-col>
        </a-row>
        <a-steps
          :current="1"
          :direction="
            (isMobile() && directionType.vertical) || directionType.horizontal
          "
          progressDot
        >
          <a-step>
            <span style="font-size: 14px" slot="title">{{
              $t('result')['success.step1-title']
            }}</span>
            <template slot="description">
              <div
                style="fontSize: 12px; color: rgba(0, 0, 0, 0.45); position: relative; left: 42px;text-align: left;"
                slot="description"
              >
                <div style="margin: 8px 0 4px">
                  曲丽丽
                  <a-icon style="margin-left: 8px" type="dingding-o" />
                </div>
                <div>2016-12-12 12:32</div>
              </div>
            </template>
          </a-step>
          <a-step :title="$t('result')['success.step2-title']">
            <span style="font-size: 14px" slot="title">{{
              $t('result')['success.step2-title']
            }}</span>
            <template slot="description">
              <div
                style="fontSize: 12px; color: rgba(0, 0, 0, 0.45); position: relative; left: 42px;text-align: left;"
                slot="description"
              >
                <div style="margin: 8px 0 4px">
                  周毛毛
                  <a-icon
                    style="margin-left: 8px; color: #00A0E9"
                    type="dingding-o"
                  />
                </div>
                <div>
                  <a href>{{ $t('result')['success.step2-extra'] }}</a>
                </div>
              </div>
            </template>
          </a-step>
          <a-step :title="$t('result')['success.step3-title']">
            <span style="font-size: 14px" slot="title">{{
              $t('result')['success.step3-title']
            }}</span>
          </a-step>
          <a-step :title="$t('result')['success.step4-title']">
            <span style="font-size: 14px" slot="title">{{
              $t('result')['success.step4-title']
            }}</span>
          </a-step>
        </a-steps>
      </div>
    </result>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator'
import { Result } from '@/components'
import { DeviceMixin } from '@/utils/mixins'

@Component({
  components: {
    Result
  }
})
export default class Success extends Mixins(DeviceMixin) {
  private directionType = {
    horizontal: 'horizontal',
    vertical: 'vertical'
  }
}
</script>
