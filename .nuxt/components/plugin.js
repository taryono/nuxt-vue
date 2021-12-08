import Vue from 'vue'

const components = {
  ColorModePicker: () => import('../..\\components\\ColorModePicker.vue' /* webpackChunkName: "components/color-mode-picker" */).then(c => c.default || c),
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c),
  Notification: () => import('../..\\components\\Notification.vue' /* webpackChunkName: "components/notification" */).then(c => c.default || c),
  FormTutorialAdd: () => import('../..\\components\\form\\TutorialAdd.vue' /* webpackChunkName: "components/form-tutorial-add" */).then(c => c.default || c),
  FormTutorialEdit: () => import('../..\\components\\form\\TutorialEdit.vue' /* webpackChunkName: "components/form-tutorial-edit" */).then(c => c.default || c),
  FormUserAdd: () => import('../..\\components\\form\\UserAdd.vue' /* webpackChunkName: "components/form-user-add" */).then(c => c.default || c),
  FormUserEdit: () => import('../..\\components\\form\\UserEdit.vue' /* webpackChunkName: "components/form-user-edit" */).then(c => c.default || c),
  LayoutsHeader: () => import('../..\\components\\layouts\\Header.vue' /* webpackChunkName: "components/layouts-header" */).then(c => c.default || c),
  LayoutsSidebar: () => import('../..\\components\\layouts\\Sidebar.vue' /* webpackChunkName: "components/layouts-sidebar" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
