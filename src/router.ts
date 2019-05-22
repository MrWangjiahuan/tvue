import Vue from 'vue'
import Router from 'vue-router'
import findLast from 'lodash/findLast'
import { notification } from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NotFound from '@/views/404.vue'
import Forbidden from '@/views/403.vue'
import { check, isLogin } from '@/utils/auth'

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
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Register.vue')
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
            name: 'basicform',
            meta: { title: 'basicform' },
            component: () =>
              import(
                /* webpackChunkName: "form" */ '@/views/forms/BasicForm.vue'
              )
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            meta: { title: 'stepform' },
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, record => record.meta.authority)
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
