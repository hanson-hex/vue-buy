import Vue from 'vue'
import Router from 'vue-router'
import test from '../components/test'
import index from '../components/Index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {title: 'index'}
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {title: 'test'}
    }
]})

export default router
