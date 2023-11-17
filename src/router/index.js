import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/login/index.vue'
import user from '../views/home/UserHome.vue'
import administrator from '../views/home/AdmHome.vue'

import cardata from '../views/administrator/carData/index.vue'
import newcar from '../views/administrator/newCar/index.vue'
import turnover from '../views/administrator/turnover/index.vue'

import mydata from '../views/user/myData/index.vue'
import rentcar from '../views/user/rentCar/index.vue'
import { useUserStore, useAdminStore } from '../stores'

import { ElMessage } from 'element-plus'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/administrator',
      component: administrator,
      children: [
        { path: '/administrator/cardata', component: cardata },
        { path: '/administrator/newcar', component: newcar },
        { path: '/administrator/turnover', component: turnover }
      ]
    },
    {
      path: '/user',
      component: user,
      children: [
        { path: '/user/mydata', component: mydata },
        { path: '/user/rentcar', component: rentcar }
      ]
    }
  ]
})

//路由守卫
//这里还是要注意一下next并不是出口函数，在一条逻辑中能且仅能出现一次
router.beforeEach((to) => {
  // ...
  // 返回 false 以取消导航
  if (to.path === '/login') return
  else if (to.matched.some((record) => record.path.startsWith('/administrator'))) {
    console.log('判断为管理员')
    if (!useAdminStore.token) {
      ElMessage({
        message: '请先登录',
        type: 'error',
        duration: 1500, // 持续显示时间，单位毫秒
        center: true // 是否居中显示
      })
      return '/login'
    }
  } else if (to.matched.some((record) => record.path.startsWith('/user'))) {
    console.log('判断为普通用户')
    if (!useUserStore.token) {
      ElMessage({
        message: '请先登录',
        type: 'error',
        duration: 1500, // 持续显示时间，单位毫秒
        center: true // 是否居中显示
      })
      return '/login'
    }
  }
})
export default router
