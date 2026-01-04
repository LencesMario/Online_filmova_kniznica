<template>
  <div>
    <h2>Top filmy</h2>
    <MovieList :movies="topMovies" />
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'
import MovieList from '../components/MovieList.vue'

export default {
  name: 'TopMoviesPage',
  components: { MovieList },
  computed: {
    topMovies() {
      return useMoviesStore().topMovies
    }
  }
}
</script>
