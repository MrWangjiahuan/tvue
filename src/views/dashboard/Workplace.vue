<template>
  <page-view :avatar="userInfo.avatar" :title="false">
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ userInfo.name }}
        <span class="welcome-text">，要不要打一把 DOTA</span>
      </div>
      <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <header-info
            title="项目数"
            content="56"
            :center="false"
            :bordered="false"
          />
        </a-col>
        <a-col :span="8">
          <header-info
            title="团队排名"
            content="8/24"
            :center="false"
            :bordered="false"
          />
        </a-col>
        <a-col :span="8">
          <header-info title="项目访问" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="进行中的项目"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra">全部项目</a>
            <div>
              <a-card-grid
                class="project-card-grid"
                :key="i"
                v-for="(item, i) in projects"
              >
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.cover" />
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/">科学搬砖组</a>
                    <span class="datetime">9小时前</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span
                    >&nbsp; 在&nbsp; <a href="#">{{ item.project.name }}</a
                    >&nbsp; <span>{{ item.project.action }}</span
                    >&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <a-card
            title="快速开始 / 便捷导航"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <a-button size="small" type="primary" ghost icon="plus"
                >添加</a-button
              >
            </div>
          </a-card>
          <a-card
            title="XX 指数"
            style="margin-bottom: 24px"
            :loading="radarLoading"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div style="min-height: 400px;">
              <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
              <radar :data="radarData" />
            </div>
          </a-card>
          <a-card :loading="loading" title="团队" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Utils from '@/utils/util'
import PageView from '@/layouts/PageView.vue'
import Radar from '@/components/Charts/Radar.vue'
import { HeaderInfo } from '@/components/'
import {
  getProjects as getProjectsApi,
  getActivity as getActivityApi,
  getTeams as getTeamsApi,
  getRadar as getRadarApi
} from '@/api/dashboard'

const DataSet = require('@antv/data-set')

@Component({
  components: {
    PageView,
    Radar,
    HeaderInfo
  }
})
export default class Workplace extends Vue {
  @Getter userInfo

  private timeFix = Utils.timeFix()
  private loading: boolean = true
  private radarLoading: boolean = true
  private projects = []
  private activities = []
  private teams = []
  // data
  private axis1Opts = {
    dataKey: 'item',
    line: null,
    tickLine: null,
    grid: {
      lineStyle: {
        lineDash: null
      },
      hideFirstLine: false
    }
  }
  private axis2Opts = {
    dataKey: 'score',
    line: null,
    tickLine: null,
    grid: {
      type: 'polygon',
      lineStyle: {
        lineDash: null
      }
    }
  }
  private scale = [
    {
      dataKey: 'score',
      min: 0,
      max: 80
    }
  ]
  private axisData = [
    { item: '引用', a: 70, b: 30, c: 40 },
    { item: '口碑', a: 60, b: 70, c: 40 },
    { item: '产量', a: 50, b: 60, c: 40 },
    { item: '贡献', a: 40, b: 50, c: 40 },
    { item: '热度', a: 60, b: 70, c: 40 },
    { item: '引用', a: 70, b: 50, c: 40 }
  ]
  private radarData = []

  private mounted() {
    this.getProjects()
    this.getActivity()
    this.getTeams()
    this.initRadar()
  }
  private getProjects() {
    return getProjectsApi().then(res => {
      console.log(
        '%cres: ',
        'color: MidnightBlue; background: Aquamarine; font-size: 20px;',
        res
      )
      this.projects = res.data.data
      this.loading = false
    })
  }
  private getActivity() {
    return getActivityApi().then(res => {
      this.activities = res.data.data
    })
  }
  private getTeams() {
    return getTeamsApi().then(res => {
      this.teams = res.data.data
    })
  }
  private initRadar() {
    this.radarLoading = true
    return getRadarApi().then(res => {
      const dv = new DataSet.View().source(res.data.data)
      dv.transform({
        type: 'fold',
        fields: ['个人', '团队', '部门'],
        key: 'user',
        value: 'score'
      })
      this.radarData = dv.rows
      this.radarLoading = false
    })
  }
}
</script>

<style lang="less" src="./less/workplace.less" />
