<template>
  <div>
    <h2>Moje obľúbené filmy</h2>
    <MovieList :movies="favorites" />
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'
import MovieList from '../components/MovieList.vue'

export default {
  name: 'FavoritesPage',
  components: { MovieList },
  computed: {
    favorites() {
      return useMoviesStore().favoriteMovies
    }
  }
}
</script>
