<template>
  <div v-if="movie" class="movie-detail">
    <div class="header">
      <button @click="goBack" class="back-btn">←</button>
      <h2>{{ movie.title }} ({{ movie.year }})</h2>
    </div>
    
    <img :src="movie.image" alt="poster" class="poster" />

    <p><strong>Žáner:</strong> {{ movie.genre }}</p>
    <p><strong>Dĺžka:</strong> {{ movie.length }} minút</p>
    <p><strong>Herci:</strong> {{ movie.actors.join(', ') }}</p>
    <p><strong>Popis:</strong> {{ movie.description }}</p>
    <p><strong>Jazyk:</strong> {{ movie.language }}</p>
    <p><strong>Titulky:</strong> {{ movie.subtitles ? 'áno' : 'nie' }}</p>
    <p><strong>Rating:</strong> ⭐ {{ movie.rating.toFixed(1) }}/10</p>

    <button @click="toggleToWatch" class="to-watch-btn">
      {{ movie.toWatch ? '➖ Odobrať z môjho zoznamu' : '➕ Pridať do môjho zoznamu' }}
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
    toggleToWatch() {
      const store = useMoviesStore()
      store.toggleToWatch(this.movie.id)
    },
    goBack() {
      // Vráti sa na predchádzajúcu stránku
      this.$router.go(-1)
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
.header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn:hover {
  background-color: #e0e0e0;
}

.poster {
  width: 250px;
  border-radius: 10px;
  margin: 10px 0;
}

.to-watch-btn {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #333;
  cursor: pointer;
  background-color: #f5f5f5;
  font-size: 16px;
  margin-top: 15px;
}

.to-watch-btn:hover {
  background-color: #e0e0e0;
}

.movie-detail {
  max-width: 600px;
  margin: 0 auto;
}
</style>