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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* flexibilné stĺpce */
  gap: 20px;
  margin-top: 20px;
  align-items: stretch; /* všetky karty v riadku rovnakej výšky */
}
</style>
