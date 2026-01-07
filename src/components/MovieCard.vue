<template>
  <div class="card" @click="$router.push(`/movie/${movie.id}`)">
    <img :src="movie.image" alt="movie poster" />
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.year }}</p>
    <p>⭐ {{ movie.rating }}/10</p> <!-- rating -->
    <button @click.stop="toggleToWatch">
      {{ movie.toWatch ? '🎬 Chcem pozrieť' : '➕ Pridať do zoznamu' }}
    </button>
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'

export default {
  name: "MovieCard",
  props: {
    movie: Object
  },
  methods: {
    toggleToWatch() {
      const store = useMoviesStore()
      store.toggleToWatch(this.movie.id)
    }
  }
}
</script>
