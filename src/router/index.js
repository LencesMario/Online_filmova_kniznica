import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import TopMovies from '../pages/TopMovies.vue'
import Favorites from '../pages/Favorites.vue'
import Search from '../pages/Search.vue'
import MovieDetail from '../pages/MovieDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/top', component: TopMovies },
  { path: '/favorites', component: Favorites },
  { path: '/search', component: Search },
  { path: '/movie/:id', component: MovieDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
