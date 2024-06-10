// stores/userStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    favorites: [],
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(`http://localhost:3000/api/utilisateurs/login`, credentials);
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.fetchProfile();
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async fetchProfile() {
      try {
        const response = await axios.get(`http://localhost:3000/api/utilisateurs/profile`);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
    async fetchFavorites() {
      try {
        const response = await axios.get(`http://localhost:3000/api/favoris`);
        this.favorites = response.data;
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }
  }
});
