<template>
  <div class="list">
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue'

export default {
  name: "MovieList",
  components: { MovieCard },
  props: {
    movies: Array
  }
}
</script>

<style>
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
</style>
