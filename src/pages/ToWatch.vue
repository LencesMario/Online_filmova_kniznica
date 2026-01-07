<template>
  <div>
    <h2>Filmy na pozretie</h2>
    <MovieList :movies="toWatchMovies" />
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'
import MovieList from '../components/MovieList.vue'

export default {
  name: 'ToWatchPage',
  components: { MovieList },
  computed: {
    toWatchMovies() {
      return useMoviesStore().toWatchMovies
    }
  }
}
</script>
