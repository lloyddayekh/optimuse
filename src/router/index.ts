import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { MainPaths } from '@/enums/general.routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: MainPaths.HOME.path,
      name: MainPaths.HOME.name,
      component: HomeView
    },
    {
      path: MainPaths.SHAPEONE.path,
      name: MainPaths.SHAPEONE.name,
      component: () => import('../views/ShapeOne.vue')
    },
    {
      path: MainPaths.SHAPETWO.path,
      name: MainPaths.SHAPETWO.name,
      component: () => import('../views/ShapeTwo.vue')
    }
  ]
})

export default router
