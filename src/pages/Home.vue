<template>
  <div>
    <h2>Všetky filmy</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }} ({{ movie.year }})
      </li>
    </ul>
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'

export default {
  name: 'HomePage',
  computed: {
    movies() {
      const store = useMoviesStore()
      return store.movies
    }
  }
}
</script>
