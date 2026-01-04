import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import TopMovies from '../pages/TopMovies.vue'
import Favorites from '../pages/Favorites.vue'
import Search from '../pages/Search.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/top', component: TopMovies },
  { path: '/favorites', component: Favorites },
  { path: '/search', component: Search }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
