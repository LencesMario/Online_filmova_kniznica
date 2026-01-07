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
        image: '/images/inception.jpg',
        rating: 9.9,
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
        image: '/images/interstellar.jpg',
        rating: 9.8,
        toWatch: false
      }
    ]
  }),

  getters: {
    topMovies(state) {
      return state.movies
        .slice() // kópia poľa, aby sa originál nemenil
        .sort((a, b) => b.rating - a.rating) // zorad od najvyššieho ratingu
        .slice(0, 1) // vyber top 5 filmov
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
