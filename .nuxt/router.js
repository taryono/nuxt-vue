import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5f747b9f = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _70fe47ac = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _5a55437e = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _832f3a84 = () => interopDefault(import('..\\pages\\tutorials\\index.vue' /* webpackChunkName: "pages/tutorials/index" */))
const _3b3197aa = () => interopDefault(import('..\\pages\\users\\index.vue' /* webpackChunkName: "pages/users/index" */))
const _c47b3856 = () => interopDefault(import('..\\pages\\tutorials\\add\\index.vue' /* webpackChunkName: "pages/tutorials/add/index" */))
const _4e423d28 = () => interopDefault(import('..\\pages\\tutorials\\auth.vue' /* webpackChunkName: "pages/tutorials/auth" */))
const _0451053e = () => interopDefault(import('..\\pages\\tutorials\\lists\\index.vue' /* webpackChunkName: "pages/tutorials/lists/index" */))
const _1178d479 = () => interopDefault(import('..\\pages\\tutorials\\view\\index.vue' /* webpackChunkName: "pages/tutorials/view/index" */))
const _b14322f0 = () => interopDefault(import('..\\pages\\users\\add\\index.vue' /* webpackChunkName: "pages/users/add/index" */))
const _bf8ca342 = () => interopDefault(import('..\\pages\\users\\auth.vue' /* webpackChunkName: "pages/users/auth" */))
const _109ba754 = () => interopDefault(import('..\\pages\\users\\lists\\index.vue' /* webpackChunkName: "pages/users/lists/index" */))
const _36616100 = () => interopDefault(import('..\\pages\\users\\profile\\index.vue' /* webpackChunkName: "pages/users/profile/index" */))
const _667525a6 = () => interopDefault(import('..\\pages\\tutorials\\edit\\_id\\index.vue' /* webpackChunkName: "pages/tutorials/edit/_id/index" */))
const _7345c3ce = () => interopDefault(import('..\\pages\\users\\edit\\_id\\index.vue' /* webpackChunkName: "pages/users/edit/_id/index" */))
const _6e89a241 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _5f747b9f,
    name: "dashboard"
  }, {
    path: "/login",
    component: _70fe47ac,
    name: "login"
  }, {
    path: "/register",
    component: _5a55437e,
    name: "register"
  }, {
    path: "/tutorials",
    component: _832f3a84,
    name: "tutorials"
  }, {
    path: "/users",
    component: _3b3197aa,
    name: "users"
  }, {
    path: "/tutorials/add",
    component: _c47b3856,
    name: "tutorials-add"
  }, {
    path: "/tutorials/auth",
    component: _4e423d28,
    name: "tutorials-auth"
  }, {
    path: "/tutorials/lists",
    component: _0451053e,
    name: "tutorials-lists"
  }, {
    path: "/tutorials/view",
    component: _1178d479,
    name: "tutorials-view"
  }, {
    path: "/users/add",
    component: _b14322f0,
    name: "users-add"
  }, {
    path: "/users/auth",
    component: _bf8ca342,
    name: "users-auth"
  }, {
    path: "/users/lists",
    component: _109ba754,
    name: "users-lists"
  }, {
    path: "/users/profile",
    component: _36616100,
    name: "users-profile"
  }, {
    path: "/tutorials/edit/:id",
    component: _667525a6,
    name: "tutorials-edit-id"
  }, {
    path: "/users/edit/:id",
    component: _7345c3ce,
    name: "users-edit-id"
  }, {
    path: "/",
    component: _6e89a241,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
