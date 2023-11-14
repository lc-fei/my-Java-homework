import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/login/index.vue'
import user from '../views/home/UserHome.vue'
import administrator from '../views/home/AdmHome.vue'

import cardata from '../views/administrator/carData/index.vue'
import newcar from '../views/administrator/newCar/index.vue'
import turnover from '../views/administrator/turnover/index.vue'

import mydata from '../views/user/myData/index.vue'
import rentcar from '../views/user/rentCar/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
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

export default router
