<template>
  <div>
    <h2>Vyhľadávanie filmov</h2>

    <div class="filters">
      <input v-model="title" placeholder="Názov filmu" />

      <!-- Žáner ako dropdown -->
      <select v-model="genre">
        <option value="">Všetky žánre</option>
        <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
      </select>

      <!-- Rok ako dropdown -->
      <select v-model.number="year">
        <option value="">Všetky roky</option>
        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
      </select>

      <input v-model="actor" placeholder="Herec" />
    </div>

    <MovieList :movies="filteredMovies" />
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'
import MovieList from '../components/MovieList.vue'

export default {
  name: 'SearchPage',
  components: { MovieList },
  data() {
    return {
      title: '',
      genre: '',
      year: '',
      actor: ''
    }
  },
  computed: {
    store() {
      return useMoviesStore()
    },
    filteredMovies() {
      return this.store.movies.filter(movie => {
        return (
          (!this.title || movie.title.toLowerCase().includes(this.title.toLowerCase())) &&
          (!this.genre || movie.genre === this.genre) &&
          (!this.year || movie.year === this.year) &&
          (!this.actor || movie.actors.some(a => a.toLowerCase().includes(this.actor.toLowerCase())))
        )
      })
    },
    genres() {
      // vyber všetky unikátne žánre zo store
      const allGenres = this.store.movies.map(m => m.genre)
      return [...new Set(allGenres)]
    },
    years() {
      // vyber všetky unikátne roky zo store a zorad vzostupne
      const allYears = this.store.movies.map(m => m.year)
      return [...new Set(allYears)].sort((a, b) => a - b)
    }
  }
}
</script>

<style>
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filters input,
.filters select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
