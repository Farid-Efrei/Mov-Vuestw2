import { defineStore } from "pinia";

export const useFacticeUserStore = defineStore('facticeUser', {
    state: () => ({
        users: [
            { id: 1, email: 'user1@example.com', username: 'Fairytale', password: 'password1' },
            { id: 2, email: 'user2@example.com', username: 'user2', password: 'password2' }
        ],
        currentUser: null,
        movies: [
            { id: 1, title: "Inception" },
            { id: 2, title: "Interstellar" },
            { id: 3, title: "J'ai rencontré le diable" },
        ],
        favorites: [
            { userId: 1, movieId: 3 },
            { userId: 2, movieId: 1 },
            { userId: 1, movieId: 2 }
        ],
        comments: [
            { userId: 1, movieId: 3, content: "Magistral !!!", id: 1 },
            { userId: 2, movieId: 3, content: "Flippant et Stressant", id: 2 },
            { userId: 1, movieId: 1, content: "Une référence !", id: 3 },
            { userId: 2, movieId: 2, content: "Un voyage intersidéral", id: 4 },
        ],
        ratings: [
            { userId: 1, movieId: 3, rating: 5, id: 1 },
            { userId: 2, movieId: 1, rating: 1, id: 2 },
            { userId: 1, movieId: 1, rating: 4.5, id: 3 },
            { userId: 2, movieId: 2, rating: 3, id: 4 }
        ]
    }),
    getters: {
        userFavorites: state => {
            return state.favorites.filter(fav => fav.userId === state.currentUser?.id).map(fav => {
                return state.movies.find(movie => movie.id === fav.movieId);
            });
        },
        movieComments: state => {
            return state.comments.filter(comment => comment.userId === state.currentUser?.id).map(comment => {
                const movie = state.movies.find(movie => movie.id === comment.movieId);
                return { ...comment, movieTitle: movie.title };
            });
        },
        userRatings: state => {
            return state.ratings.filter(rating => rating.userId === state.currentUser?.id).map(rating => {
                const movie = state.movies.find(movie => movie.id === rating.movieId);
                return { ...rating, movieTitle: movie.title }
            });
        },
        userProfile: state => {
            return state.currentUser;
        }
    },
    actions: {
        async login(credentials) {
            const user = this.users.find(user => user.email === credentials.email && user.password === credentials.password);
            if (user) {
                this.currentUser = user;
                return true;
            } else {
                throw new Error('Credentials invalides');
            }
        },
        async register(credentials) {
            const id = this.users.length + 1;
            const newUser = { id, ...credentials };
            this.users.push(newUser);
            this.currentUser = newUser;
        },

        async fetchProfile() {
            // Pas besoin d'appel HTTP, les données factices sont déjà dans le state
        },
        async updateProfile(profileData) {
            if (this.currentUser) {
                this.currentUser = { ...this.currentUser, ...profileData };
            }
        },
        async deleteAccount() {
            this.users = this.users.filter(user => user.id !== this.currentUser?.id);
            this.logout();
        },
        logout() {
            this.currentUser = null;
        },
        async fetchFavorites() {
            // Pas besoin d'appel HTTP, les données factices sont déjà dans le state
        },
        async fetchComments() {
            // Pas besoin d'appel HTTP, les données factices sont déjà dans le state
        },
        async fetchRatings() {
            // Pas besoin d'appel HTTP, les données factices sont déjà dans le state
        },
        async addFavorite(movieId) {
            if (this.currentUser) {
                const id = this.favorites.length + 1;
                this.favorites.push({ userId: this.currentUser.id, movieId, id });
            }
        },
        async removeFavorite(favoriteId) {
            this.favorites = this.favorites.filter(fav => fav.id !== favoriteId);
        },
        async addComment({ movieId, content }) {
            if (this.currentUser) {
                const id = this.comments.length + 1;
                this.comments.push({ userId: this.currentUser.id, movieId, content, id });
            }
        },
        async updateComment({ commentId, content }) {
            const index = this.comments.findIndex(c => c.id === commentId);
            if (index !== -1) {
                this.comments[index].content = content;
            }
        },
        async removeComment(commentId) {
            this.comments = this.comments.filter(comment => comment.id !== commentId);
        },
        async addRating({ movieId, rating }) {
            if (this.currentUser) {
                const id = this.ratings.length + 1;
                this.ratings.push({ userId: this.currentUser.id, movieId, rating, id });
            }
        },
        async updateRating({ ratingId, rating }) {
            const index = this.ratings.findIndex(r => r.id === ratingId);
            if (index !== -1) {
                this.ratings[index].rating = rating;
            }
        },
        async removeRating(ratingId) {
            this.ratings = this.ratings.filter(rating => rating.id !== ratingId);
        }
    }
})