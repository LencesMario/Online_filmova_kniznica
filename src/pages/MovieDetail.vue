<template>
  <div v-if="movie">
    <h2>{{ movie.title }} ({{ movie.year }})</h2>
    <img :src="movie.image" alt="poster" class="poster"/>
    <p><strong>Žáner:</strong> {{ movie.genre }}</p>
    <p><strong>Dĺžka:</strong> {{ movie.length }} minút</p>
    <p><strong>Herci:</strong> {{ movie.actors.join(', ') }}</p>
    <p><strong>Popis:</strong> {{ movie.description }}</p>
    <button @click="toggleFavorite">
      {{ movie.favorite ? '💖 Obľúbené' : '🤍 Pridať do obľúbených' }}
    </button>
  </div>
  <div v-else>
    <p>Film nebol nájdený.</p>
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'

export default {
  name: 'MovieDetail',
  data() {
    return {
      movie: null
    }
  },
  methods: {
    toggleFavorite() {
      const store = useMoviesStore()
      store.toggleFavorite(this.movie.id)
    }
  },
  mounted() {
    const store = useMoviesStore()
    const id = this.$route.params.id
    this.movie = store.getMovieById(id)
  }
}
</script>

<style>
.poster {
  width: 250px;
  border-radius: 10px;
  margin: 10px 0;
}
</style>
