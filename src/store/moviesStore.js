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
        image: 'https://via.placeholder.com/200x300',
        top: true,
        favorite: false
      },
      {
        id: 2,
        title: 'Interstellar',
        year: 2014,
        genre: 'Sci-Fi',
        length: 169,
        actors: ['Matthew McConaughey', 'Anne Hathaway'],
        description: 'Cesta vesmírom za záchranou ľudstva.',
        image: 'https://via.placeholder.com/200x300',
        top: true,
        favorite: false
      }
    ]
  }),

  getters: {
    topMovies(state) {
      return state.movies.filter(m => m.top)
    },
    favoriteMovies(state) {
      return state.movies.filter(m => m.favorite)
    },
    getMovieById: (state) => {
      return (id) => state.movies.find(m => m.id === Number(id))
    }
  },

  actions: {
    toggleFavorite(id) {
      const movie = this.movies.find(m => m.id === id)
      if (movie) movie.favorite = !movie.favorite
    }
  }
})
