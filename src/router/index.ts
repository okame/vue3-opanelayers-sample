import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OsmView from '@/views/OsmView.vue'
import GsiView from '@/views/GsiView.vue'
import MtView from '@/views/MtView.vue'
import OlView from '@/views/OlView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/osm',
      name: 'osm',
      component: OsmView
    },
    {
      path: '/gsi',
      name: 'gsi',
      component: GsiView
    },
    {
      path: '/mt',
      name: 'mt',
      component: MtView
    },
    {
      path: '/ol',
      name: 'ol',
      component: OlView
    },
  ]
})

export default router
