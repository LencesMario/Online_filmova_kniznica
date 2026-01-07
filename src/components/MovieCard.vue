<template>
  <div class="card" @click="$router.push(`/movie/${movie.id}`)">
    <img :src="movie.image" alt="movie poster" />
    <h3 class="title">{{ movie.title }}</h3>
    <div class="card-bottom">
      <p>{{ movie.year }}</p>
      <p>⭐ {{ movie.rating }}/10</p>
      <button @click.stop="toggleToWatch">
        {{ movie.toWatch ? '➖ Odobrať z môjho zoznamu' : '➕ Pridať do môjho zoznamu' }}
      </button>
    </div>
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
  display: flex;
  flex-direction: column;
  height: 100%; /* roztiahne sa na výšku gridu */
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center; /* všetko vycentruje horizontálne */
}

.card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  display: block;
}

.card .title {
  margin: 10px 0 0 0; /* hneď pod obrazkom */
}

.card-bottom {
  display: flex;
  flex-direction: column;
  margin-top: auto; /* presunie obsah ku spodku */
  gap: 5px; /* rovnomerné medzery medzi rok, rating a button */
}

.card button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
