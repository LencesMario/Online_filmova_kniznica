import inceptionImg from '../assets/inception.jpg'
import interstellarImg from '../assets/interstellar.jpg'

import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [
      {
        id: 1,
        title: 'Inception',
        year: 2010,
        genre: 'Sci-Fi',
        length: 148,
        actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
        description: 'Film o snoch a realite.',
        image: inceptionImg,
        rating: 9,         
        toWatch: false
      },
      {
        id: 2,
        title: 'Interstellar',
        year: 2014,
        genre: 'Sci-Fi',
        length: 169,
        actors: ['Matthew McConaughey', 'Anne Hathaway'],
        description: 'Cesta vesmírom za záchranou ľudstva.',
        image: interstellarImg,
        rating: 8,
        toWatch: false
      }
    ]
  }),

  getters: {
    topMovies(state) {
      // teraz vyberá filmy s rating >= 8 (môžeš nastaviť podľa potreby)
      return state.movies.filter(m => m.rating >= 8)
    },
    toWatchMovies(state) {
      return state.movies.filter(m => m.toWatch)
    },
    getMovieById: (state) => {
      return (id) => state.movies.find(m => m.id === Number(id))
    }
  },

  actions: {
    toggleToWatch(id) {
      const movie = this.movies.find(m => m.id === id)
      if (movie) movie.toWatch = !movie.toWatch
    },
    setRating(id, rating) {
      const movie = this.movies.find(m => m.id === id)
      if (movie) movie.rating = rating
    }
  }
})
