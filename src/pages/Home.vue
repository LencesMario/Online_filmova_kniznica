<template>
  <div>
    <h2>Všetky filmy</h2>

    <MovieList :movies="displayedMovies" />

    <div v-if="displayedMovies.length < allMovies.length" class="load-more">
      <LoadMoreButton :onClick="addMoreMovies" />
    </div>
  </div>
</template>

<script>
import { useMoviesStore } from '../store/moviesStore'
import MovieList from '../components/MovieList.vue'
import LoadMoreButton from '../components/LoadMoreButton.vue'

export default {
  name: 'HomePage',
  components: { MovieList, LoadMoreButton },
  data() {
    return {
      displayedMovies: [], // filmy, ktoré sa aktuálne zobrazujú
    }
  },
  computed: {
    store() {
      return useMoviesStore()
    },
    allMovies() {
      return this.store.movies
    }
  },
  mounted() {
    this.displayedMovies = this.getRandomMovies(10)
  },
  methods: {
    getRandomMovies(count) {
      // vyber náhodné filmy, ktoré ešte nie sú v displayedMovies
      const remaining = this.allMovies.filter(m => !this.displayedMovies.includes(m))
      const shuffled = remaining.sort(() => Math.random() - 0.5)
      return shuffled.slice(0, count)
    },
    addMoreMovies() {
      const more = this.getRandomMovies(5)
      this.displayedMovies = [...this.displayedMovies, ...more]
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
