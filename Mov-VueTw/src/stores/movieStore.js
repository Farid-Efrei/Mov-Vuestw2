// stores/movieStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    currentMovie: null,
    appreciations: [],
  }),
  getters: {
    movieDetails: (state) => state.currentMovie,
    movieAppreciations: (state) => state.appreciations,
  },
  actions: {
    async fetchMovieById(movieId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos/${movieId}`);
        this.currentMovie = response.data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    },
    async fetchAppreciationsByMovieId(movieId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/appreciations/${movieId}`);
        this.appreciations = response.data;
      } catch (error) {
        console.error('Error fetching appreciations:', error);
      }
    },
    async addAppreciation(appreciation) {
      try {
        const response = await axios.post(`http://localhost:3000/api/appreciations`, appreciation);
        this.appreciations.push(response.data);
      } catch (error) {
        console.error('Error adding appreciation:', error);
      }
    },
    async toggleFavorite(movieId) {
      try {
        const response = await axios.post(`http://localhost:3000/api/favoris/toggle`, { movieId });
        if (response.data.added) {
          this.userStore.favorites.push(movieId);
        } else {
          const index = this.userStore.favorites.indexOf(movieId);
          if (index > -1) {
            this.userStore.favorites.splice(index, 1);
          }
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    },
  }
});
