<template>
  <div class="page-container">
    <h1>Vyhľadávanie filmov</h1>

    <div class="filter-container">
      <!-- Prvý riadok filtrov -->
      <div class="filter-row">
        <div class="filter-group">
          <label>Názov filmu</label>
          <input v-model="title" placeholder="Zadajte názov" />
        </div>

        <div class="filter-group">
          <label>Herec</label>
          <input v-model="actor" placeholder="Meno herca" />
        </div>

        <div class="filter-group">
          <label>Žáner</label>
          <select v-model="genre">
            <option value="">Všetky žánre</option>
            <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Rok vydania</label>
          <select v-model.number="year">
            <option value="">Všetky roky</option>
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
      </div>

      <!-- Druhý riadok filtrov -->
      <div class="filter-row">
        <div class="filter-group">
          <label>Jazyk</label>
          <select v-model="language">
            <option value="">Všetky jazyky</option>
            <option v-for="l in languages" :key="l" :value="l">
              {{ l }}
            </option>
          </select>
        </div>

        <!-- Slider pre dĺžku (kompaktnejší) -->
        <div class="filter-group slider-compact">
          <label>Dĺžka: {{ lengthRange[0] }} - {{ lengthRange[1] }} min</label>
          <div class="compact-slider">
            <input 
              type="range" 
              v-model.number="lengthRange[0]" 
              :min="minLength" 
              :max="maxLength" 
              @input="updateLengthMin"
            />
            <input 
              type="range" 
              v-model.number="lengthRange[1]" 
              :min="minLength" 
              :max="maxLength" 
              @input="updateLengthMax"
            />
          </div>
        </div>

        <!-- Slider pre hodnotenie (kompaktnejší) -->
        <div class="filter-group slider-compact">
          <label>Hodnotenie: {{ ratingRange[0] }} - {{ ratingRange[1] }}/10</label>
          <div class="compact-slider">
            <input 
              type="range" 
              v-model.number="ratingRange[0]" 
              :min="0" 
              :max="10" 
              step="0.1"
              @input="updateRatingMin"
            />
            <input 
              type="range" 
              v-model.number="ratingRange[1]" 
              :min="0" 
              :max="10" 
              step="0.1"
              @input="updateRatingMax"
            />
          </div>
        </div>
      </div>

      <!-- Tretí riadok - zoradenie a titulky -->
      <div class="filter-row">
        <div class="filter-group">
          <label>Zoradiť podľa názvu</label>
          <select v-model="sortTitle">
            <option value="">Bez zoradenia</option>
            <option value="asc">A–Z</option>
            <option value="desc">Z–A</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Zoradiť podľa dĺžky</label>
          <select v-model="sortLength">
            <option value="">Bez zoradenia</option>
            <option value="asc">Najkratší</option>
            <option value="desc">Najdlhší</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Zoradiť podľa hodnotenia</label>
          <select v-model="sortRating">
            <option value="">Bez zoradenia</option>
            <option value="asc">Najnižšie</option>
            <option value="desc">Najvyššie</option>
          </select>
        </div>

        <!-- Titulky checkbox - posledné pred resetom -->
        <div class="filter-group checkbox-group">
          <label class="checkbox">
            <input type="checkbox" v-model="subtitlesOnly" />
            Iba s titulkami
          </label>
        </div>

        <div class="filter-group reset-group">
          <button @click="resetFilters" class="reset-btn">Resetovať všetky filtre</button>
        </div>
      </div>
    </div>

    <div class="results-info">
      <p>Nájdených filmov: {{ filteredMovies.length }}</p>
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
      actor: '',
      genre: '',
      year: '',
      language: '',
      subtitlesOnly: false,
      sortTitle: '',
      sortLength: '',
      sortRating: '',
      lengthRange: [0, 300],
      ratingRange: [0, 10],
      minLength: 0,
      maxLength: 300
    }
  },
  created() {
    this.calculateLengthRange()
  },
  computed: {
    store() {
      return useMoviesStore()
    },
    filteredMovies() {
      let movies = this.store.movies.filter(movie => {
        const movieGenres = movie.genre.split(',').map(g => g.trim())

        return (
          (!this.title || movie.title.toLowerCase().includes(this.title.toLowerCase())) &&
          (!this.actor || movie.actors.some(a =>
            a.toLowerCase().includes(this.actor.toLowerCase())
          )) &&
          (!this.genre || movieGenres.includes(this.genre)) &&
          (!this.year || movie.year === this.year) &&
          (!this.language || movie.language === this.language) &&
          (!this.subtitlesOnly || movie.subtitles) &&
          (movie.length >= this.lengthRange[0] && movie.length <= this.lengthRange[1]) &&
          (movie.rating >= this.ratingRange[0] && movie.rating <= this.ratingRange[1])
        )
      })

      // Zložené zoradenie - umožňuje kombinovať viacero kritérií
      if (this.sortTitle || this.sortLength || this.sortRating) {
        movies = [...movies]
        
        // Vytvoríme pole kritérií v pevnom poradí
        const sortCriteria = []
        
        // Poradie kritérií: 1. hodnotenie, 2. dĺžka, 3. názov
        // Toto znamená, že ak si zvolíte "najvyššie hodnotenie" a "A-Z",
        // filmy sa najprv zoradia podľa hodnotenia (od najvyššieho),
        // a potom filmy s rovnakým hodnotením sa zoradia abecedne
        
        if (this.sortRating) {
          sortCriteria.push({
            key: 'rating',
            order: this.sortRating,
            type: 'number'
          })
        }
        
        if (this.sortLength) {
          sortCriteria.push({
            key: 'length',
            order: this.sortLength,
            type: 'number'
          })
        }
        
        if (this.sortTitle) {
          sortCriteria.push({
            key: 'title',
            order: this.sortTitle,
            type: 'string'
          })
        }
        
        // Zložené zoradenie podľa všetkých kritérií
        movies.sort((a, b) => {
          for (const criterion of sortCriteria) {
            let aValue = a[criterion.key]
            let bValue = b[criterion.key]
            let comparison = 0
            
            if (criterion.type === 'string') {
              // Pre reťazce používame localeCompare
              comparison = aValue.localeCompare(bValue, 'sk', { sensitivity: 'base' })
            } else {
              // Pre čísla jednoduché odčítanie
              comparison = aValue - bValue
            }
            
            if (comparison !== 0) {
              // Ak máme vzostupné, vrátime comparison, inak obrátené
              return criterion.order === 'asc' ? comparison : -comparison
            }
          }
          return 0
        })
      }

      return movies
    },
    genres() {
      return [...new Set(
        this.store.movies.flatMap(m => m.genre.split(',').map(g => g.trim()))
      )].sort()
    },
    years() {
      return [...new Set(this.store.movies.map(m => m.year))].sort((a, b) => b - a)
    },
    languages() {
      return [...new Set(this.store.movies.map(m => m.language))].sort()
    }
  },
  methods: {
    resetFilters() {
      this.title = ''
      this.actor = ''
      this.genre = ''
      this.year = ''
      this.language = ''
      this.subtitlesOnly = false
      this.sortTitle = ''
      this.sortLength = ''
      this.sortRating = ''
      this.lengthRange = [this.minLength, this.maxLength]
      this.ratingRange = [0, 10]
    },
    calculateLengthRange() {
      const movies = this.store.movies
      if (movies.length > 0) {
        const lengths = movies.map(m => m.length)
        this.minLength = Math.min(...lengths)
        this.maxLength = Math.max(...lengths)
        this.lengthRange = [this.minLength, this.maxLength]
      }
    },
    updateLengthMin() {
      if (this.lengthRange[0] > this.lengthRange[1]) {
        this.lengthRange[0] = this.lengthRange[1]
      }
    },
    updateLengthMax() {
      if (this.lengthRange[1] < this.lengthRange[0]) {
        this.lengthRange[1] = this.lengthRange[0]
      }
    },
    updateRatingMin() {
      if (this.ratingRange[0] > this.ratingRange[1]) {
        this.ratingRange[0] = this.ratingRange[1]
      }
    },
    updateRatingMax() {
      if (this.ratingRange[1] < this.ratingRange[0]) {
        this.ratingRange[1] = this.ratingRange[0]
      }
    }
  },
  watch: {
    'store.movies': {
      handler() {
        this.calculateLengthRange()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.filter-container {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.filter-row {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 180px;
  flex: 1;
}

.filter-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #495057;
  font-size: 14px;
}

.filter-group input,
.filter-group select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #4dabf7;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.15);
}

.filter-group input::placeholder {
  color: #868e96;
}

/* Checkbox skupina */
.checkbox-group {
  justify-content: center;
  padding-top: 8px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal;
}

.checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  border-radius: 4px;
}

/* Kompaktné slidery */
.slider-compact {
  min-width: 250px;
}

.slider-compact label {
  font-weight: 600;
  margin-bottom: 10px;
  color: #495057;
}

.compact-slider {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
}

.compact-slider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: #dee2e6;
  border-radius: 2px;
  transform: translateY(-50%);
  z-index: 1;
}

.compact-slider .track-fill {
  position: absolute;
  top: 50%;
  left: var(--min-percent, 0%);
  right: calc(100% - var(--max-percent, 100%));
  height: 4px;
  background: #339af0;
  border-radius: 2px;
  transform: translateY(-50%);
  z-index: 2;
}

.compact-slider input[type="range"] {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  -webkit-appearance: none;
  appearance: none; /* Pridaná štandardná vlastnosť */
  pointer-events: none;
  margin: 0;
  padding: 0;
  pointer-events: none;
  z-index: 3;
}

.compact-slider input[type="range"]::-webkit-slider-thumb {
  pointer-events: auto;
  -webkit-appearance: none;
  appearance: none; /* Pridaná štandardná vlastnosť */
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #339af0;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.compact-slider input[type="range"]::-moz-range-thumb {
  pointer-events: auto;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #339af0;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.2s;
  position: relative;
  z-index: 4;
}

.compact-slider input[type="range"]::-webkit-slider-runnable-track {
  height: 4px;
  background: linear-gradient(to right, 
    #dee2e6 0%,
    #339af0 0%,
    #339af0 100%,
    #dee2e6 100%
  );
  border-radius: 2px;
}

.reset-btn {
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #ff6b6b, #fa5252);
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  width: 100%;
  font-size: 14px;
}

.reset-btn:hover {
  background: linear-gradient(135deg, #fa5252, #e03131);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(250, 82, 82, 0.3);
}

.reset-btn:active {
  transform: translateY(0);
}

/* Info o výsledkoch */
.results-info {
  margin: 20px 0;
  padding: 12px 20px;
  background: #e7f5ff;
  border-radius: 8px;
  border-left: 4px solid #339af0;
  font-weight: 600;
  color: #1864ab;
}

h2 {
  color: #343a40;
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 700;
}

/* Responsivita */
@media (max-width: 1200px) {
  .filter-group {
    min-width: calc(33.333% - 20px);
  }
}

@media (max-width: 768px) {
  .filter-group {
    min-width: calc(50% - 20px);
  }
  
  .filter-container {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .filter-group {
    min-width: 100%;
  }
  
  .filter-row {
    gap: 16px;
  }
}

.page-container {
  padding: 0 16px;
}
</style>