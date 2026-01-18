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
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

/* HOVER EFFECT - "zdvihnutie" karty */
.card:hover {
  transform: translateY(-12px) scale(1.03);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.2),
    0 15px 30px rgba(0, 0, 0, 0.15),
    0 0 10px rgba(76, 175, 80, 0.15), /* jemný zelený rozptyl */
    0 0 0 1px rgba(76, 175, 80, 0.2); /* tenký zelený okraj */
  border-color: rgba(76, 175, 80, 0.3); /* priesvitná zelená */
  z-index: 10;
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
