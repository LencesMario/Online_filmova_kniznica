<template>
  <div>
    <h2>Top filmy</h2>

    <MovieList :movies="displayedMovies" />

    <div v-if="displayedMovies.length < allTopMovies.length" class="load-more">
      <button @click="addMoreMovies">Ďalších 5</button>
    </div>
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'
import MovieList from '../components/MovieList.vue'

export default {
  name: 'TopMoviesPage',
  components: { MovieList },
  data() {
    return {
      displayedMovies: []
    }
  },
  computed: {
    store() {
      return useMoviesStore()
    },
    allTopMovies() {
      return this.store.topMovies
    }
  },
  mounted() {
    // zobrazíme prvých 5 filmov
    this.displayedMovies = this.allTopMovies.slice(0, 10)
  },
  methods: {
    addMoreMovies() {
      const start = this.displayedMovies.length
      const next5 = this.allTopMovies.slice(start, start + 5)
      this.displayedMovies = [...this.displayedMovies, ...next5]
    }
  }
}
</script>

<style>
.load-more {
  text-align: center;
  margin-top: 20px;
}

.load-more button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #333;
  cursor: pointer;
  background-color: #f5f5f5;
}

.load-more button:hover {
  background-color: #e0e0e0;
}
</style>
