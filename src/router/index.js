import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todo-list',
    name: 'TodoApp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/TodoApp/index')
  },
  {
    path: '/canvas',
    name: 'Canvas',
    component: () => import('@/views/Canvas/index'),
    children: [
      {
        path: '/canvas/test',
        name: 'CanvasTest',
        component: () => import('@/views/Canvas/TestField')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404')
  }
]

const router = new VueRouter({
  routes
})

export default router
