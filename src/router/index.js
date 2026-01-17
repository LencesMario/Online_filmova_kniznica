import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import TopMovies from '../pages/TopMovies.vue'
import Favorites from '../pages/ToWatch.vue'
import Search from '../pages/Search.vue'
import MovieDetail from '../pages/MovieDetail.vue'
import AboutPage from '../pages/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/top', component: TopMovies },
  { path: '/favorites', component: Favorites },
  { path: '/search', component: Search },
  { path: '/movie/:id', component: MovieDetail },
  { path: '/about', component: AboutPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
