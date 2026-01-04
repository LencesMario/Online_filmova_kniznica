<template>
  <div>
    <h2>Všetky filmy</h2>
    <MovieList :movies="movies" />
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'
import MovieList from '../components/MovieList.vue'

export default {
  name: 'HomePage',
  components: { MovieList },
  computed: {
    movies() {
      return useMoviesStore().movies
    }
  }
}
</script>
