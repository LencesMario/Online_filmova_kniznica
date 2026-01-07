<template>
  <div class="card" @click="$router.push(`/movie/${movie.id}`)">
    <img :src="movie.image" alt="movie poster" />
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.year }}</p>
    <p>⭐ {{ movie.rating }}/10</p>
    <button @click.stop="toggleToWatch">
      {{ movie.toWatch ? '➖ Odobrať z môjho zoznamu' : '➕ Pridať do môjho zoznamu' }}
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

<style>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  width: 200px;
  text-align: center;
  cursor: pointer;
}

.card img {
  width: 100%;
  border-radius: 5px;
}

.card button {
  margin-top: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
