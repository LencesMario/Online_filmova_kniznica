<template>
  <div class="page-container">
    <h1>Filmy na pozretie</h1>
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

<style scoped>
h1 {
  text-align: center;
  padding: 20px;
  margin-bottom: 30px;
}

.page-container {
  padding: 0 16px;
}

</style>
