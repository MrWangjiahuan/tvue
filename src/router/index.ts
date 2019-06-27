import Vue from 'vue'
import Router, { Route } from 'vue-router'
import _findLast from 'lodash/findLast'
import { notification } from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NotFound from '@/views/exception/404.vue'
import Forbidden from '@/views/exception/403.vue'
import { check, isLogin } from '@/utils/auth'
import Utils from '@/utils/util'
import enUS from '@/locale/enUS'
import zhCN from '@/locale/zhCN'
import config from '@/config/defaultSettings'
import * as types from '@/store/mutation-types'
import RouteView from '@/layouts/RouteView.vue'

NProgress.configure({ showSpinner: false })
Vue.use(Router)

const routes = [
  {
    path: '/user',
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        meta: { title: 'login' },
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
      },
      {
        path: '/user/register',
        name: 'register',
        meta: { title: 'register' },
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Register.vue')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () =>
          import(
            /* webpackChunkName: "user" */ '@/views/user/RegisterResult.vue'
          )
      }
    ]
  },
  {
    path: '/',
    meta: { authority: ['user', 'admin'] },
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/layouts/BasicLayout.vue'),
    children: [
      // dashboard
      {
        path: '/',
        redirect: '/dashboard/analysis'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { icon: 'dashboard', title: 'dashboard' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: 'analysis' },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '@/views/dashboard/Analysis.vue'
              )
          }
        ]
      },
      // form
      {
        path: '/form',
        name: 'form',
        component: { render: h => h('router-view') },
        meta: { icon: 'form', title: 'form', authority: ['admin'] },
        children: [
          {
            path: '/form/basic-form',
            name: 'basicForm',
            meta: { title: 'basicForm' },
            component: () =>
              import(
                /* webpackChunkName: "form" */ '@/views/forms/BasicForm.vue'
              )
          },
          {
            path: '/form/step-form',
            name: 'stepForm',
            meta: { title: 'stepForm' },
            hideChildrenInMenu: true,
            component: () =>
              import(
                /* webpackChunkName: "form" */ '@/views/forms/stepForm/index.vue'
              ),
            children: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info'
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '@/views/forms/stepForm/Step1.vue'
                  )
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '@/views/forms/stepForm/Step2.vue'
                  )
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '@/views/forms/stepForm/Step3.vue'
                  )
              }
            ]
          }
        ]
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: 'exception', icon: 'warning' },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () =>
              import(
                /* webpackChunkName: "fail" */ '@/views/exception/403.vue'
              ),
            meta: { title: 'exception_403' }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () =>
              import(
                /* webpackChunkName: "fail" */ '@/views/exception/404.vue'
              ),
            meta: { title: 'exception_404' }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () =>
              import(
                /* webpackChunkName: "fail" */ '@/views/exception/500.vue'
              ),
            meta: { title: 'exception_500' }
          }
        ]
      },
      {
        path: '/403',
        name: '403',
        hideInMenu: true,
        component: Forbidden
      },
      {
        path: '*',
        name: '404',
        hideInMenu: true,
        component: NotFound
      }
    ]
  }
]
const router = new Router({
  mode:
    process.env.VUE_APP_GH_ENV && process.env.VUE_APP_GH_ENV === 'ghpages'
      ? 'hash'
      : 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: routes
})

router.beforeEach((to: Route, from: Route, next: any) => {
  const lan = Vue.ls.get(types.DEFAULT_LANGUAGE, config.language)
  if (to.path !== from.path) {
    NProgress.start()
    const record = _findLast(to.matched, record => record.meta.title)
    let title
    if (record) {
      title = `${
        lan === 'enUS'
          ? enUS.menu[record.meta.title]
          : zhCN.menu[record.meta.title]
      } - Ant Design Pro`
    } else {
      title = 'Ant Design Pro'
    }
    Utils.setDocumentTitle(title)
  }
  const record = _findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if (to.path !== '/403') {
      notification.error({
        message: '403',
        description: '你没有权限访问，请联系管理员咨询。'
      })
      next({
        path: '/403'
      })
    }
    NProgress.done()
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
